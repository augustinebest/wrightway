const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello world, welcome to your mern scaffold");
});

module.exports = router;
