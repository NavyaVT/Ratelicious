const model = require("../models")
const hotelController = model.Hotel
const { Op, where } = require("sequelize");

const create = async (req, res) => {
    try {
        const data = req.body
        const exist = await hotelController.findAll({
            where: { email: req.body.email }
        })
        if (exist.length > 0) {
            res.json({
                status: 400,
                message: "Email already exist"
            })
        } else {
            await hotelController.create(data)
                .then(async (val) => {
                    res.json({
                        status: 200,
                        message: "Hotel created sucessfully",
                        data: val
                    })
                })
                .catch((err) => {
                    res.json({
                        status: 400,
                        message: err.message
                    })
                })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const view = async (req, res) => {
    try {
        const { id } = req.params
        const data = await hotelController.findOne({
            where: { id: id }
        })
        if (data == null) {
            res.json({
                status: 404,
                message: "Hotel not found"
            })
        } else {
            res.json({
                status: 200,
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
const viewAll = async (req, res) => {
    try {
        const { id } = req.params
        const data = await hotelController.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        })
        if (data == 0) {
            res.json({
                status: 404,
                message: "No Hotel found"
            })
        } else {
            res.json({
                status: 200,
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
const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const [updateCount] = await hotelController.update(data, {
            where: { id: id }
        })
        if (updateCount == 0) {
            res.json({
                status: 404,
                message: "No Hotel found"
            })
        } else {
            res.json({
                status: 200,
                message: "update successful",
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params
        const del = await hotelController.destroy({
            where: { id: id }
        })
        if (del == 0) {
            res.json({
                status: 404,
                message: "No Hotel found"
            })
        } else {
            res.json({
                status: 200,
                message: "delete successful"
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const viewByOwner = async(req,res) => {
    try{
        const {ownerId} = req.params
        const data = await hotelController.findAll({
            where:{ownerId:ownerId}
        })
        if(data == 0) {
            res.json({
                status:404,
                message:"No hotels found"
            })
        } else {
            res.json({
                status:200,
                message:data
            })
        }
    } catch (err) {
        res.json({
            status:500,
            message: err.message
        })
    }
}
const findHotel = async (req,res) => {
    try {
        const word = req.body.word;
        if (!word) {
            return res.json({
                status: 400,
                message: "Word is required"
            });
        }
        const data = await hotelController.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${word}%` } },
                    { location: { [Op.iLike]: `%${word}%` } }
                ]
            }
        });
        if (data.length === 0) {
            res.json({
                status: 404,
                message: "No hotels found"
            });
        } else {
            res.json({
                status: 200,
                message: data
            });
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        });
    }
}

module.exports = {
    create,
    view,
    viewAll,
    viewByOwner,
    update,
    deleteHotel,
    findHotel
}