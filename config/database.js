const {Sequelize }=require("sequelize");
const sequelize = new Sequelize("codespark", "root", "", {
    host:"localhost",
    dialect:"mysql"
})

module.exports = sequelize