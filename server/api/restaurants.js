const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = require("express").Router();
const {
  models: { Restaurant },
} = require("../db");
module.exports = router;

router.get("/yelp", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.yelp.com/v3/businesses/search?limit=50&term=cafe&location=brooklyn",
      {
        headers: {
          Authorization: `Bearer ${process.env.bearerToken}`,
          Origin: "localhost",
          withCredentials: true,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

router.get("/yelp/:alias", async (req, res, next) => {
  try {
    const alias = req.params.alias
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/${alias}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.bearerToken}`,
          Origin: "localhost",
          withCredentials: true,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});