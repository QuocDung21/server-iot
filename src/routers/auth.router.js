const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

const verificationCodes = new Map();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.get("/verify", (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ message: "Mã xác thực không hợp lệ" });
  }

  const email = verificationCodes.get(code);
  if (!email) {
    return res
      .status(400)
      .json({ message: "Mã xác thực không hợp lệ hoặc đã hết hạn" });
  }

  // Xác thực tài khoản và xóa mã xác thực
  const user = users.find((u) => u.email === email);
  if (user) {
    user.verified = true;
    verificationCodes.delete(code);
    return res.json({ message: "Tài khoản đã được xác thực thành công" });
  } else {
    return res.status(400).json({ message: "Tài khoản không tồn tại" });
  }
});

// Trang đăng xuất
router.get("/", AuthController.listUsers);

module.exports = router;
