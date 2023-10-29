const jwt = require("jsonwebtoken");
const { SleepData } = require("../../models/Sleep.model");
const { JWTPRIVATEKEY } = require("../../config/config");

const createSleepData = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.send({
        message: "Token is not valid",
      });
    } else {
      try {
        await new SleepData({ ...req.body })
          .save()
          .then((responce) => {
            res.send({ message: "Sleep data Saved successfully" });
          })
          .catch(async (err) => {
            if (err.code === 11000) {
              await SleepData.findOneAndUpdate(
                { userId: req.body.userId },
                { ...req.body }
              ).catch((err) => {
                res.status(500).send({ message: "Internal Server Error" });
              });
              res.send({ message: "Sleep data Saved successfully" });
            } else {
              res.status(500).send({ message: "Internal Server Error" });
            }
          });
      } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  });
};

const getSleepEfficiency = async (req, res) => {
  jwt.verify(req.token, JWTPRIVATEKEY, async (err, authData) => {
    if (err) {
      res.json({
        message: "Token is not valid",
      });
    } else {
      try {
        const userId = req.params.userId;
        let sleepData = await SleepData.findOne({ userId: userId });
        if (sleepData == null) {
          res.json({
            userSleepData: null,
          });
        } else {
          const sleepEfficiency = sleepEfficiencyCalculate(sleepData);
          let sleepDataResult = sleepData.toObject();
          sleepDataResult.sleepEfficiency = sleepEfficiency;
          res.json({ userSleepData: sleepDataResult });
        }
      } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Errorrr" });
      }
    }
  });
};

const sleepEfficiencyCalculate = (sleepData) => {
  const bedTime = sleepData.bedTime.split(":");
  const bedTimeInMinutes = parseInt(bedTime[0] * 60) + parseInt(bedTime[1]);
  const wakeTime = sleepData.wakeTime.split(":");
  const wakeTimeInMinutes = parseInt(wakeTime[0] * 60) + parseInt(wakeTime[1]);
  const totalMinutesInDay = 60 * 24;
  const sleepDurationInMinites = sleepData.SleepDuration * 60;
  let totalTimeInBed;
  if (sleepDurationInMinites + bedTimeInMinutes > totalMinutesInDay) {
    totalTimeInBed = wakeTimeInMinutes + (totalMinutesInDay - bedTimeInMinutes);
  } else {
    totalTimeInBed = wakeTimeInMinutes - bedTimeInMinutes;
  }
  const sleepEfficiency =
    (sleepDurationInMinites / Math.abs(totalTimeInBed)) * 100;
  return sleepEfficiency.toFixed(2);
};

module.exports = {
  createSleepData,
  getSleepEfficiency,
};
