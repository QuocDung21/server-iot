// Middleware kiểm tra quyền của người dùng
const bcrypt = require("bcrypt");
const User = require("../models/auth.model");

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Assumed user object is available in the request (e.g., set by Passport.js)

    if (user && user.role === requiredRole) {
      // Người dùng có quyền truy cập
      next();
    } else {
      // Người dùng không có quyền truy cập, chuyển hướng hoặc trả về lỗi
      res.status(403).send("Bạn không có quyền truy cập.");
    }
  };
};

const hashPassowrd = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Middleware kiểm tra mật khẩu khi đăng nhập
const checkUserPassword = async (email, password, next) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return false;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch;
};

module.exports = {
  checkUserRole,
  hashPassowrd,
  checkUserPassword,
};
