const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Туть работает сервер");
});

module.exports = router;