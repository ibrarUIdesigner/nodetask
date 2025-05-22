const bcrypt = require("bcrypt");
const User = require("../entities/User");
const Notification = require("../entities/Notification");

const { getIO } = require("../../shared/socket");
const jwt = require("jsonwebtoken");

//? CREATE NEW USER
const registerUserService = async (payload) => {
  const { firstName, lastName, email, password } = payload;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already in use.");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    firstName,
    lastName,
    password: hashedPassword,
    email,
  });
};

//? SEND NOTIFICATION TO ALL USERS
const notifyAllUsers = async (message) => {
  const users = await User.findAll();
  const io = getIO();
  for (const user of users) {
    // 1. Save notification for all users (even if offline)
    await Notification.create({
      message,
      userId: user.id,
    });

    let messageData = "ibrar" + message + user.id;

    // 2. Emit only to online clients
    io.emit("notification", messageData);
  }
};

//? LOGIN
const loginUserService = async ({ email, password }) => {
  console.log(email, password);

  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // COMPARE PASSWORD
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid password.");
    error.statusCode = 401;
    throw error;
  }

  // Create JWT (optional)
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "1h" }
  );

  // RETuRN USER
  return {
    message: "Login successful.",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  };
};

//? FETCH ALL USERS
const fetchUsersService = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
};
module.exports = {
  registerUserService,
  notifyAllUsers,
  loginUserService,
  fetchUsersService,
};
