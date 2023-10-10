const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const {
  hashPassowrd,
  checkUserPassword,
} = require("../middleware/authMiddleware");
const User = require("../models/auth.model");

const listUsers = async (req, res) => {
  const auth = await User.find();
  return res.json(auth);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const auth = await User.find({ email: email });
    if (!auth) {
      return res.json("Email not found");
    }
    const isPasswordValid = await checkUserPassword(email, password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Mật khẩu hoặc Email không chính xác" });
    }

    const userData = {
      email: email,
      role: auth.role,
    };
    const token = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
    );

    return res.json({ message: "Đăng nhập thành công", token: token });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi trong quá trình đăng nhập" });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }
    // const verificationCode = crypto.randomBytes(32).toString("hex");
    const passHash = await hashPassowrd(password);
    const newUser = await User.create({
      email,
      password: passHash,
      verificationCode: verificationCode,
    });
    return res
      .status(200)
      .json({ message: "Create user success", user: newUser });
    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "rongvang2357hn@gmail.com", // Địa chỉ email của bạn
    //     pass: "zorw khho cvzy kohe",
    //   },
    // });
    // const mailOptions = {
    //   from: "rongvang2357hn@gmail.com",
    //   to: email,
    //   subject: "Xác thực tài khoản",
    //   text: `Nhấp vào liên kết sau để xác thực tài khoản: http://localhost:3000/api/auth/verify?code=${verificationCode}`,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Lỗi gửi email:", error);
    //     return res.status(500).json({ message: "Lỗi gửi email xác thực" });
    //   }
    //   console.log("Email xác thực đã được gửi:", info.response);
    //   return res.json({
    //     message: "Vui lòng kiểm tra email để xác thực tài khoản.",
    //   });
    // });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({ message: "Lỗi đăng ký" });
  }
};

const userDetails = (req, res) => {
  res.send("Thông tin chi tiết người dùng");
};

module.exports = {
  listUsers,
  userDetails,
  login,
  register,
};
