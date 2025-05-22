const {
  registerUserService,
  notifyAllUsers,
  loginUserService,
  fetchUsersService,
} = require("../../domain/services/userService");
const { addShopCreationJob } = require("../../jobs/queue");

//? CREATE USER
const registerUser = async (req, res, next) => {
  try {
    console.log("hello from controller");
    const { firstName, lastName, email, password } = req.body;
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    // CREATE USER
    const newUser = await registerUserService(req.body);

    // SEND NOTIFICATION
    await notifyAllUsers("A new user created successfully");

    // JOB
    // await addShopCreationJob({ userId: newUser.id });

    // SEND RESPONSE
    return res.status(201).json({ status: "success", user: newUser });
  } catch (error) {
    next(error);
  }
};

//? LOGIN USER
const loginUser = async (req, res, next) => {
  try {
    console.log("login", req.body);

    const response = await loginUserService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//? GET USERS LIST
const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchUsersService();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getAllUsers };
