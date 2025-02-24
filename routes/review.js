const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/review.controller")
const middleware = require("../middleware/verify.middleware")

router.post("/create/:hotelId",middleware.verifyUser,reviewController.create)
/**
 * @openapi
 * /review/create/{hotelId}:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         description: ID of the hotel to which the review belongs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 default: 4
 *               review:
 *                 type: string
 *                 default: Good One
 *               jwt:
 *                 type: string
 *                 default: token
 *             required:
 *               - rating
 *               - jwt
 *     responses:
 *       200:
 *         description: Review created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.get("/viewAll",reviewController.viewAll)
/**
 * @openapi
 * /review/viewAll:
 *   get:
 *     summary: Retrieve all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of all reviews found
 *       404:
 *         description: No data found
 *       500:
 *         description: Internal server error
 */
router.get("/view/:id",reviewController.view)
/**
 * @openapi
 * /review/view/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: No data found
 *       500:
 *         description: Internal server error
 */
router.get("/avg/:hotelId",reviewController.viewAvgByHotel)
/**
 * @openapi
 * /review/avg/{hotelId}:
 *   get:
 *     summary: Get average rating for a hotel
 *     tags: [Review]
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Average rating found
 *       404:
 *         description: No rating found
 *       500:
 *         description: Internal server error
 */
router.get("/viewByHotel/:hotelId",reviewController.viewByHotel)
/**
 * @openapi
 * /review/viewByHotel/{hotelId}:
 *   get:
 *     summary: Get all reviews for a specific hotel
 *     tags: [Review]
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Reviews found for the hotel
 *       404:
 *         description: No review found
 *       500:
 *         description: Internal server error
 */

module.exports = router