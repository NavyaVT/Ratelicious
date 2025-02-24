const express = require('express');
const router = express.Router();
const HotelController = require("../controllers/hotel.controller")
const middleware = require("../middleware/verify.middleware")
router.post("/create",middleware.sessionVerify,HotelController.create)
/**
 * @openapi
 * /hotel/create:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: Hidden Fork
 *               location:
 *                 type: string
 *                 default: Peelamedu
 *               email:
 *                 type: string
 *                 default: hiddenfork@gmail.com
 *               phoneNo:
 *                 type: string
 *                 default: 1234567890
 *               password:
 *                 type: string
 *                 default: pass@1234
 *     responses:
 *       200:
 *         description: Hotel created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.get("/view/:id",middleware.verifyUser,HotelController.view)
/**
 * @openapi
 * /hotel/view/{id}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotel]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Hotel details
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.get("/viewAll",HotelController.viewAll)
/**
 * @openapi
 * /hotel/viewAll:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotel]
 *     responses:
 *       200:
 *         description: List of hotels
 *       404:
 *         description: No hotels found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id",middleware.verifyUser,HotelController.update)
/**
 * @openapi
 * /hotel/update/{id}:
 *   put:
 *     summary: Update a hotel
 *     tags: [Hotel]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: change@gmail.com
 *     responses:
 *       200:
 *         description: Update successful
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id",middleware.verifyUser,HotelController.deleteHotel)
/**
 * @openapi
 * /hotel/delete/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     tags: [Hotel]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *           required:
 *              - password
 *     responses:
 *       200:
 *         description: Delete successful
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.get("/viewbyowner/:id",middleware.sessionVerify,HotelController.viewByOwner)
/**
 * @openapi
 * /hotel/delete/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     tags: [Hotel]
 *     parameters:
 *       - name: ownerId
 *         in: path
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Hotel details
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.post("/find",HotelController.findHotel)
/**
 * @openapi
 * /hotel/find:
 *   post:
 *     summary: Find hotels by name or location
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of matching hotels
 *       400:
 *         description: Word is required
 *       404:
 *         description: No hotels found
 *       500:
 *         description: Internal server error
 */

module.exports = router;