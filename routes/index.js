const express = require('express')
const mongoose = require('mongoose')
const { dbUrl } = require('../config/dbconfig')
const { UserModel } = require('../schema/UserSchema')
const router = express.Router()

mongoose.connect(dbUrl)

router.get('/', async (req, res) => {
    try {
        let users = await UserModel.find()
        res.status(200).send({message: "Data Fatch Sucsessfully",users})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.post('/', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            let newUser = await UserModel.create(req.body)
            res.status(200).send({ message: 'User Created Successfully' })
        }
        else {
            res.status(400).send({ message: `User With ${req.body.email} Already Exists` })
        }

    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        let data = await UserModel.findById(req.params.id)
        if (data) {
            res.status(200).send({message: "Data Saved Sucsessfully",data})
        }
        else {
            res.status(400).send({message: 'Invaild Id',error: error?.message})
        }
    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
        if (user) {
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            await user.save()
        }
        res.status(200).send({message: "Data Updated Sucsessfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let user = await UserModel.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(200).send({message: "Data Deleted Sucsessfully"})
        }
        else {
            res.status(400).send({ message: 'Invaild User Id' })
        }
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router;