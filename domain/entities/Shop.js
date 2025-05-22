const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");

const Shop = sequelize.define(
  "Shop",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Relationships
Shop.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Shop, { foreignKey: "userId" });

module.exports = Shop;
