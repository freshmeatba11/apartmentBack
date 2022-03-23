const router = require("express").Router();
const UtilityBill = require("../models").utilityBillModel;
const utilityBillValidation = require("../validation").utilityBillValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.get("/", (req, res) => {
  UtilityBill.find({})
    .populate("author", ["username", "email"])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send("Error!! Cannot get utility bill!!");
    });
});

router.post("/", async (req, res) => {
  // validate the inputs before making a new post
  const { error } = utilityBillValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let {
    title,
    recordDate,
    previousTotalDegree,
    currentTotalDegree,
    gas,
    people,
    roomA,
    roomB,
    roomC,
    roomD,
  } = req.body;
  if (req.user.isRoommate()) {
    return res.status(400).send("Only manager can make a new record.");
  }

  let newUtilityBill = new UtilityBill({
    title,
    recordDate,
    previousTotalDegree,
    currentTotalDegree,
    gas,
    people,
    roomA,
    roomB,
    roomC,
    roomD,
    author: req.user._id,
  });

  try {
    await newUtilityBill.save();
    res.status(200).send("New record has been saved.");
  } catch (err) {
    res.status(400).send("Cannot save record.");
  }
});

router.patch("/:_id", async (req, res) => {
  // validate the inputs before making a new post
  const { error } = utilityBillValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let utilityBill = await UtilityBill.findOne({ _id });
  if (!utilityBill) {
    res.status(404);
    return res.json({
      success: false,
      message: "Record not found.",
    });
  }

  if (
    req.user.isAdmin() ||
    (post.author.equals(req.user._id) && req.user.isManager())
  ) {
    UtilityBill.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Record updated.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message:
        "Only the author of this record or web admin can edit this record.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let utilityBill = await UtilityBill.findOne({ _id });
  if (!utilityBill) {
    res.status(404);
    return res.json({
      success: false,
      message: "Record not found.",
    });
  }

  if (
    req.user.isAdmin() ||
    (post.author.equals(req.user._id) && req.user.isManager())
  ) {
    UtilityBill.deleteOne({ _id })
      .then(() => {
        res.send("Record deleted.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message:
        "Only the author of this record or web admin can delete this record.",
    });
  }
});

module.exports = router;
