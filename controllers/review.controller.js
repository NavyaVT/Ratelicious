const { Op, Sequelize } = require("sequelize")
const models = require("../models")
const reviewController = models.Review

const create = async (req, res) => {
    try {
        const data = req.body
        const { hotelId } = req.params
        data.hotelId = hotelId
        const create = await reviewController
            .create(data)
            .then((val) => {
                res.json({
                    status: 200,
                    message: "Review created successfully",
                })
            })
            .catch((err) => {
                res.json({
                    status: 400,
                    message: err.message
                })
            })
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const viewAll = async (req, res) => {
    const data = await reviewController.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    if (data.length == 0) {
        res.json({
            status: 404,
            message: "No data found"
        })
    } else {
        res.json({
            status: 200,
            message: data
        })
    }
}
const view = async (req, res) => {
    const { id } = req.params
    const data = await reviewController.findOne({
        where: { id: id },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    if (data == null) {
        res.json({
            status: 404,
            message: "No data found"
        })
    } else {
        res.json({
            status: 200,
            message: data
        })
    }
}
const viewAvgByHotel = async (req, res) => {
    const { hotelId } = req.params
    try {
        const rating = await reviewController.findAll({
            attributes: [
                "hotelId",
                [Sequelize.fn('AVG', Sequelize.col("rating")), 'avgRating']
            ],
            where: { hotelId: hotelId },
            group: ["hotelId"]
        })
        if (rating == null) {
            res.json({
                status: 404,
                message: "No rating found"
            })
        } else {
            res.json({
                status: 200,
                message: rating
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const viewByHotel = async (req, res) => {
    const { hotelId } = req.params
    try {
        const data = await reviewController.findAll({
            where: { hotelId: hotelId }
        })
        if(data.length == 0){
            res.json({
                status:404,
                message: "No review found"
            })
        } else {
            res.json({
                status : 200,
                message: data
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
module.exports = {
    create,
    viewAll,
    view,
    viewAvgByHotel,
    viewByHotel
}