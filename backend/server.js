require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/news", newsRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => console.log("Backend running on port 3001"));
});
