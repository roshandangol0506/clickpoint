const express = require("express");
const {
  handleUserSignup,
  handleEditUser,
  handleGetUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/user", handleGetUser);
router.post("/usersignup", handleUserSignup);
router.put("/edituser/:user_id", handleEditUser);

module.exports = router;
