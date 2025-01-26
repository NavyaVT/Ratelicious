const express = require('express');
const router = express.Router();
const HotelController = require("../controllers/hotel.controller")

router.post("/create",HotelController.create)
router.get("/view/:id",HotelController.view)
router.get("/viewAll",HotelController.viewAll)
router.put("/update/:id",HotelController.update)
router.delete("/delete/:id",HotelController.deleteHotel)
router.get("/find",HotelController.findHotel)

module.exports = router;