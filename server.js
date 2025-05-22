const app = require("./app");
const sequelize = require("./config/database");
const http = require("http");
const { initSocket } = require("./shared/socket");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = initSocket(server);

// Store socket.io instance globally
app.set("io", io);

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync({ alter: true });
    console.log("Database synced.");

    // START EXPRESS SERVER
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start app:", error);
  }
};

startApp();
