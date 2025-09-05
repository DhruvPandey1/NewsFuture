const express = require("express");
const { addBookmark, getBookmarks, deleteBookmark } = require("../controllers/bookmarkController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addBookmark);
router.get("/", protect, getBookmarks);
router.delete("/:id", protect, deleteBookmark);

module.exports = router;
