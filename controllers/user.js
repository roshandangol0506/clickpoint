const User = require("../modules/user");

async function handleGetUser(req, res) {
  const data = await User.find();
  res.json(data);
}

async function handleUserSignup(req, res) {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All Fields are Required" });
    }

    const newUser = new User({ name, email, username, password });
    await newUser.save();
    return res.status(200).json({ message: "User Signup Successful", newUser });
  } catch (error) {
    return res.status(500).json({ error: "Failed to signup User" });
  }
}

async function handleEditUser(req, res) {
  try {
    const { user_id } = req.params;
    const { name, email, username, password } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    if (password) user.password = password;

    await user.save();
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
}

module.exports = { handleGetUser, handleUserSignup, handleEditUser };
