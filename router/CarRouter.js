// import express and use router method
const router = require("express").Router();
const CarController = require("../controllers/CarController");
// router setup
router.get("/", CarController.getCar);
router.get("/history", CarController.readCarList);
router.post("/", CarController.carIn);
router.post("/out", CarController.carOut);
// export router object
module.exports = router;