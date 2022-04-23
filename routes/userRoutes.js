const authController = require("./../controller/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post(
  "/emailVerifyLogin/:verificationToken",
  authController.emailVerifiedLogin
);

router.patch("/resetPassword/:token", authController.resetPassword);

router.post("/forgotPassword", authController.forgotPassword);

module.exports = router;
