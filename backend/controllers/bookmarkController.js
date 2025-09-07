const Bookmark = require("../models/Bookmark");

exports.addBookmark = async (req, res) => {
  const { title, url } = req.body;
  const bookmark = await Bookmark.create({ title, url, UserId: req.user.id });
  res.json(bookmark);
};

exports.getBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.findAll({ where: { UserId: req.user.id } });
  res.json(bookmarks);
};

exports.deleteBookmark = async (req, res) => {
  const { id } = req.params;
  await Bookmark.destroy({ where: { id, UserId: req.user.id } });
  res.json({ message: "Bookmark removed" });
};
