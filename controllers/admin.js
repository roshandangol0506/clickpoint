const Admin = require("../modules/admin");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service.js/auth");

async function handleAdminSignup(req, res) {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All Fields are Required" });
    }

    const newAdmin = new Admin({ name, email, username, password });
    await newAdmin.save();
    return res.status(200).json({ message: "Admin Signup Successful" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to signup admin" });
  }
}

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin)
    return res.status(400).json({
      error: "Invalid username or Password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, admin);
  res.cookie("uid", sessionId);
  return res.status(200).json({ message: "Admin Login Successful" });
}
module.exports = { handleAdminSignup, handleAdminLogin };
