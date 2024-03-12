const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ message: "Internal server eroro" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, username } = req.body;
  try {
    const user = User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    user.email = email;

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error udating user");
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user =await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User nor found" });
    }
    await user.destroy();
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error("Error deleting user");
    res.status(500).json({ error: "Internal server error" });
  }
};
