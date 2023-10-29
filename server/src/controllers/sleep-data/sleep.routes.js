const router = require("express").Router();
const { createSleepData, getSleepEfficiency } = require("./sleep.contoller");

router.get("/sleep/efficiency/users/:userId", verifyToken, getSleepEfficiency);

router.post("/", verifyToken, createSleepData);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      message: "Token is not valid",
    });
  }
}

module.exports = router;
