const axios = require("axios");
require("dotenv").config()
exports.getNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news" });
  }
};
