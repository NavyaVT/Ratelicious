var token = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const model = require("../models")
const { where } = require('sequelize')
const hotel = model.Hotel
const review = model.Review
const picture = model.Picture

module.exports.sessionVerify = (req, res, next) => {
    const { jwt } = req.body
    const { id } = req.params
    const { ownerId } = req.body.ownerId
    try {
        var decode = token.verify(jwt, secret)
        if (!decode) {
            res.json({
                status: 400,
                message: 'Session Expired',
            })
        } else {
            if (decode.id == id || decode.id == ownerId) { next() }
            else {
                res.json({
                    status:400,
                    message: "Unauthorised Web Token"
                })
            }
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error,
        })
    }
}
module.exports.verifyUser = async (req, res, next) => {
    const { jwt: token } = req.body;
    const {id} = req.params;
    const { ownerId } = await hotel.findOne({
        where:{id:id}
    })
    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(400).json({
                message: 'Session Expired',
            });
        }
        if (decoded.id === ownerId) {
            next();
        } else {
            return res.status(400).json({
                message: "Unauthorised Web Token",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
module.exports.verifyuser = async (req, res, next) => {
    const { jwt: token } = req.body;
    const {id} = req.params;
    const { ownerId } = await review.findOne({
        where:{id:id}
    })
    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(400).json({
                message: 'Session Expired',
            });
        }
        if (decoded.id === ownerId) {
            next();
        } else {
            return res.status(400).json({
                message: "Unauthorised Web Token",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
module.exports.verifyPicUser = async (req, res, next) => {
    const { jwt: token } = req.body;
    const {id} = req.params;
    const { ownerId } = await picture.findOne({
        where:{id:id}
    })
    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(400).json({
                message: 'Session Expired',
            });
        }
        if (decoded.id === ownerId) {
            next();
        } else {
            return res.status(400).json({
                message: "Unauthorised Web Token",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};