const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const userMiddleware = require("../middleware/verify.middleware")

router.post("/create", userController.createUser);
/** POST Methods */
    /**
     * @openapi
     * '/user/create':
     *  post:
     *     tags:
     *     - user Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *              - email
     *              - password
     *            properties:
     *              name:
     *                type: string
     *                default: john
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      200:
     *        description: success
     *      400:
     *        description: Email already exist
     *      500:
     *        description: error
     */
router.get("/viewall", userController.viewAll);
/** GET Methods */
    /**
     * @openapi
     * '/user/viewAll':
     *  get:
     *     tags:
     *     - user Controller
     *     summary: Get all user 
     *     responses:
     *      200:
     *        description: data
     *      404:
     *        description: No data found
     *      400:
     *        description: error in your request
     */
router.get("/viewone/:id", userController.viewOne);
/** GET Methods */
    /**
     * @openapi
     * '/user/viewone/{id}':
     *  get:
     *     tags:
     *     - user Controller
     *     summary: Get a user by Id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     responses:
     *      200:
     *        description: data
     *      404:
     *        description: user not found
     *      400:
     *        description: error in your request
     */
router.put("/update/:id", userMiddleware.sessionVerify, userController.userUpdate);
/** PUT Methods */
    /**
     * @openapi
     * '/user/update/{id}':
     *  put:
     *     tags:
     *     - user Controller
     *     summary: update a user by Id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - jwt
     *            properties:
     *              email:
     *                type: string
     *                default: newmail
     *              jwt:
     *                type: string
     *                default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2OTc3Njc0LCJleHAiOjE3MTcwNjQwNzR9.CFVPLm8hO08SaFQaehb4BVCnfugBIc-L_UsJX5pCBHo
     *     responses:
     *      200:
     *        description: updated successfully
     *      404:
     *        description: user not found
     *      400:
     *        description: error in your request
     */
router.delete("/delete/:id", userMiddleware.sessionVerify, userController.userDelete);
/** DELETE Methods */
    /**
     * @openapi
     * '/user/delete/{id}':
     *  delete:
     *     tags:
     *     - user Controller
     *     summary: delete a user by Id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - jwt
     *            properties:
     *              jwt:
     *                type: string
     *                default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2OTc3Njc0LCJleHAiOjE3MTcwNjQwNzR9.CFVPLm8hO08SaFQaehb4BVCnfugBIc-L_UsJX5pCBHo
     *     responses:
     *      200:
     *        description: deleted successfully
     *      404:
     *        description: user not found
     *      400:
     *        description: error in your request
     */
router.post("/login", userController.login);
/** POST Methods */
    /**
     * @openapi
     * '/user/login':
     *  post:
     *     tags:
     *     - user Controller
     *     summary: login a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      200:
     *        description: success
     *      404:
     *        description: email not found
     *      400:
     *        description: password incorrect
     */
router.post("/otp/:id", userMiddleware.sessionVerify, userController.otpVerify);
/** POST Methods */
    /**
     * @openapi
     * '/user/otp/{id}':
     *  post:
     *     tags:
     *     - user Controller
     *     summary: get otp for a user
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - otp
     *              - jwt
     *            properties:
     *              jwt:
     *                type: string
     *                default: token
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              otp:
     *                type: string
     *                default: 123456
     *     responses:
     *      200:
     *        description: OTP is correct
     *      400:
     *        description: OTP is incorrect
     */

router.post("/logout/:id",  userMiddleware.sessionVerify,userController.logout);
/** GET Methods */
    /**
     * @openapi
     * '/user/logout/{id}':
     *  get:
     *     tags:
     *     - user Controller
     *     summary: logout a user by Id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - jwt
     *            properties:
     *              jwt:
     *                type: string
     *                default: token
     *     responses:
     *      200:
     *        description: logout successful
     *      404:
     *        description: user not found
     *      400:
     *        description: error in your request
     */
module.exports = router;