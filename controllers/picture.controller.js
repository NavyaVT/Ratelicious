const model = require("../models")
const pictureController = model.Pictures

const create = async (req, res) => {
    try {
        const data = req.body
        const create = await pictureController.create(data)
            .then(async (val) => {
                res.json({
                    status: 200,
                    message: "Post created successfully"
                })
            }).catch((error) => {
                res.json({
                    status: 400,
                    message: error.message
                })
            })
    }
    catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}
const viewPic = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pictureController.findOne({
            where: { id: id },
            exclude: ["createdAt", "updatedAt"]
        })
        if (data == null) {
            res.json({
                status: 404,
                message: "Picture not found"
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
const viewHotelPicture = async (req, res) => {
    try {
        const { hotelId } = req.params
        const data = await pictureController
            .findAll({
                where: { hotelId: hotelId },
                exclude: ["createdAt", "updatedAt"]
            })
        if (data.length === 0) {
            res.json({
                status: 404,
                message: "Pictures not found"
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
        const data = await pictureController
            .findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
        if (data == 0) {
            res.json({
                status: 404,
                message: "No picture found"
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
    const { id } = req.params
    const { password, ...data } = req.body
    try {
        const picture = await pictureController.findOne({
            where: { id: id },
            include: [
                {
                    model: model.Hotel,
                    where: { password:password }
                }
            ]
        });
        if (!picture) {
            return res.json({
                status: 404,
                message: "Picture not found or invalid hotel password"
            });
        }
        const [updCount] = await pictureController.update(data, {
            where: { id }
        });
        if (updCount === 0) {
            return res.json({
                status: 404,
                message: "Update failed"
            });
        }
        return res.json({
            status: 200,
            message: "Update successful"
        });
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        });
    }
}
const deletePic = async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    try {
        const picture = await pictureController.findOne({
            where: { id: id },
            include: [
                {
                    model: model.Hotel,
                    where: { password:password }
                }
            ]
        });
        if (!picture) {
            return res.json({
                status: 404,
                message: "Picture not found or invalid hotel password"
            });
        }
        const del = await pictureController.destroy({
            where: {
                id: id
            }
        })
        if (del == 0) {
            res.json({
                status: 404,
                message: "Picture not found"
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
        });
    }
}
module.exports = {
    create,
    viewPic,
    viewHotelPicture,
    viewAll,
    update,
    deletePic
}