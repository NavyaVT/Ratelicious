const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review.controller")

router.post("/create/:hotelId",reviewController.create)
router.get("/viewAll",reviewController.viewAll)
router.get("/view/:id",reviewController.view)
router.get("/avg/:hotelId",reviewController.viewAvgByHotel)
router.get("/viewByHotel/:hotelId",reviewController.viewByHotel)

module.exports = router