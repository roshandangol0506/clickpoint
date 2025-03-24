const express = require("express");
const {
  handleGenerateRole,
  handleGetRole,
  handleEditRole,
} = require("../controllers/role");

const router = express.Router();

router.get("/role", handleGetRole);
router.post("/addrole", handleGenerateRole);
router.put("/editrole/:role_id", handleEditRole);

module.exports = router;
