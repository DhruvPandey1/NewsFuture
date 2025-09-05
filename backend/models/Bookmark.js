const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Bookmark = sequelize.define("Bookmark", {
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Bookmark);
Bookmark.belongsTo(User);

module.exports = Bookmark;
