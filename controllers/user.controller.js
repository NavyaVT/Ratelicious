const model = require('../models')
const userController = model.User
const { Op } = require("sequelize")
require("dotenv").config();

var jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const createUser = async (req, res) => {
    try {
        const data = req.body
        await userController
            .findAll({
                where: { email: req.body.email },
            })
            .then(async (val) => {
                if (val.length == 0) {
                    await userController
                        .create(data)
                        .then(async (value) => {
                            let token = jwt.sign({ id: value.id }, secret, {
                                expiresIn: '1h',
                            })
                            await userController.update(
                                { jwt: token },
                                {
                                    where: {
                                        id: value.id,
                                    },
                                },
                            )
                            res.json({
                                status: 200,
                                message: 'User Account created',
                                data: { id: value.id, jwt: token },
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 400,
                                message: err,
                            })
                        })
                } else {
                    res.json({
                        status: 400,
                        message: 'This email already has an account',
                    })
                }
            })
    } catch (error) {
        res.json({
            status: 500,
            message: error,
        })
    }
}
const viewAll = async (req, res) => {
    try {
        const view = await userController
            .findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            })
        if (view == undefined) {
            throw error
        }
        if (view == 0) {
            res.json({
                status: 404,
                message: "No data found",
            })
        }
        else {
            res.json({
                status: 200,
                data: view,
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: "Something went wrong. Please try again.",
        })
    }
}

const viewOne = async (req, res) => {
    try {
        const { id } = req.params
        var list = await userController
            .findOne({
                where: { id: id },
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt'],
                },
            })
        if (list == undefined) {
            throw error
        }
        if (list == 0) {
            res.json({
                status: 404,
                message: 'No data found',
            })
        }
        else {
            res.json({
                status: 200,
                data: list,
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: "Something went wrong. Please try again.",
        })
    }
}

const userUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const update = await userController
            .update(data, {
                where: { id: id },
            })
        if (update[0] === 0 || update[0] == undefined) {
            return res.json({
                status: 404,
                message: 'user not found',
            })
        } else {
            res.json({
                status: 200,
                message: 'User updated successfully',
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: "Something went wrong. Please try again.",
        })
    }
}

const userDelete = async (req, res) => {
    try {
        const { id } = req.params
        const del = await userController
            .destroy({
                where: { id: id },
            })
        if (del == undefined) {
            throw error
        }
        if (del == 1) {
            res.json({
                status: 200,
                message: 'User deleted successfully',
            })
        } else {
            res.json({
                status: 404,
                message: 'User not found',
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: "Something went wrong. Please try again.",
        })
    }
}
const login = async (req, res) => {
    const { password, email } = req.body
    try {
        const data = await userController
            .findOne({ where: { email: email } })
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: 'Email not found',
            })
        }


        if (password != data.password) {
            return res.status(400).json({
                status: 400,
                message: 'Incorrect password',
            })
        }

        const token = jwt.sign({ id: data.id }, secret, { expiresIn: '1h' })

        await userController.update({ jwt: token }, { where: { id: data.id } })

        res.json({
            status: 200,
            message: 'Login successful',
            data: { jwt: token }
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        })
    }
}
const otpVerify = async (req, res) => {
    const { id } = req.params
    const { email } = req.body
    const { otp } = req.body
    try {
        await userController
            .findAll({
                where: { email: email, id: id },
            })
            .then(async (data) => {
                if (otp == data[0].otp) {
                    res.json({
                        status: 200,
                        message: 'OTP is correct',
                    })
                } else {
                    res.json({
                        status: 400,
                        message: 'OTP is incorrect',
                    })
                }
            })
    } catch (error) {
        res.json({
            status: 400,
            message: error,
        })
    }
}
const logout = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userController
            .findOne({
                where: { id: id }
            });

        if (user) {
            await user.update({ jwt: null });

            res.json({
                status: 200,
                message: 'Logged out successfully',
            });
        } else {
            res.json({
                status: 404,
                message: 'User not found',
            });
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Logged out failed',
        });
    }
}
module.exports = {
    createUser,
    viewAll,
    viewOne,
    userUpdate,
    userDelete,
    login,
    otpVerify,
    logout
}