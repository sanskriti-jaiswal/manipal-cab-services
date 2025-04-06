const express = require("express");
const { shareRideForPooling, getAllPooledRides } = require("../controllers/pooling.controller");

const router = express.Router();

router.post("/share", shareRideForPooling);
router.get("/all", getAllPooledRides);

module.exports = router;
