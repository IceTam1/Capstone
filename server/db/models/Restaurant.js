const { STRING } = require("sequelize");

const db = require("../db");

const Restaurant = db.define("restaurant", {
  name: {
    type: STRING,
  },
  address: {
    type: STRING,
  },
  image: {
    type: STRING,
  },
});

module.exports = Restaurant;
