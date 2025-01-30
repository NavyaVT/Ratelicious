const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/picture.controller")

router.post("/create",pictureController.create)
/**
 * @openapi
 * /picture/create:
 *   post:
 *     summary: Create a new picture
 *     tags: [Picture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: string
 *                 default: https://picture/image.jpg
 *               hotelId:
 *                 type: integer
 *                 default: 1
 *             required:
 *               - url
 *               - hotelId
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.get("/viewPic/:id",pictureController.viewPic)
/**
 * @openapi
 * /picture/viewPic/{id}:
 *   get:
 *     summary: Get a picture by ID
 *     tags: [Picture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the picture
 *     responses:
 *       200:
 *         description: Picture found
 *       404:
 *         description: Picture not found
 *       500:
 *         description: Internal server error
 */
router.get("/hotelPic/:hotelId",pictureController.viewHotelPicture)
/**
 * @openapi
 * /picture/hotelPic/{hotelId}:
 *   get:
 *     summary: Get all pictures for a specific hotel
 *     tags: [Picture]
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         description: ID of the hotel
 *     responses:
 *       200:
 *         description: Pictures found
 *       404:
 *         description: Pictures not found
 *       500:
 *         description: Internal server error
 */
router.get("/viewall",pictureController.viewAll)
/**
 * @openapi
 * /picture/viewall:
 *   get:
 *     summary: Get all pictures
 *     tags: [Picture]
 *     responses:
 *       200:
 *         description: List of pictures found
 *       404:
 *         description: No pictures found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id",pictureController.update)
/**
 * @openapi
 * /picture/update/{id}:
 *   put:
 *     summary: Update a picture
 *     tags: [Picture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: string
 *                 default: https://picture/image.jpg
 *               hotelId:
 *                 type: integer
 *                 default: 1
 *               password:
 *                 type: string
 *                 default: pass@123
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Update successful
 *       404:
 *         description: Picture not found or invalid hotel password
 *       500:
 *         description: Internal server error
 */

router.delete("/deletePic/:id",pictureController.deletePic)
/**
 * @openapi
 * /picture/deletePic/{id}:
 *   delete:
 *     summary: Delete a picture
 *     tags: [Picture]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 default: pass@123
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Delete successful
 *       404:
 *         description: Picture not found or invalid hotel password
 *       500:
 *         description: Internal server error
 */

module.exports = router
