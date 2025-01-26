const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/picture.controller")

router.post("/create",pictureController.create)
router.get("/viewPic/:id",pictureController.viewPic)
router.get("/hotelPic/:hotelId",pictureController.viewHotelPicture)
router.get("/viewall",pictureController.viewAll)
router.put("/update/:id",pictureController.update)
router.delete("/deletePic/:id",pictureController.deletePic)

module.exports = router
