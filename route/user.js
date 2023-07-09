const express = require('express')
const mongoose = require('mongoose')
const { dbUrl } = require('../config/dbconfig')
const {UserModel} = require('../schema/UserSchema')
const router = express.Router()
const {createToken,validate,adminGaurd,hashPassword,comparePassword} = require('../auth')
const { hash } = require('bcryptjs')

mongoose.connect(dbUrl)

router.get('/', async(req,res)=>{
    res.send(`
    <h2>Available Routes</h2>
    <div>GET /user/all</div>
    <div>GET /user/:id</div>
    <div>POST /user/signin</div>
    <div>POST /user/signup</div>
    <div>POST /user/Change-Password</div>
    `)
})

router.get('/all',validate,adminGaurd, async (req, res) => {
    try {
        let users = await UserModel.find()
        res.status(200).send({message: "Data Fatch Sucsessfully",users})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.post('/signup', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
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

router.post('/signin', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            //if(user.password===req.body.password) // its used before create a comparePassword
            if(await comparePassword(req.body.password,user.password)) 
            {
                let token = await createToken(user)
                res.status(200).send({message:"Login Successfull",token})

            }
            else{
                res.status(400).send({message:"Invalid Credential"})
            }
        }
        else {
            res.status(400).send({ message: `User With ${req.body.email} dose not Exists` })
        }

    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.post('/change-password/:id',validate, async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id)
        if (user) {
            //if(user.password===req.body.password) // its used before create a comparePassword
            if(await comparePassword(req.body.current_password,user.password)) 
            {
                user.password = await hashPassword(req.body.new_password)
                user.save()
                res.status(200).send({message:"Password Change Successfull"})

            }
            else{
                res.status(400).send({message:"Invalid Current Password"})
            }
        }
        else {
            res.status(400).send({ message: `User dose not Exists` })
        }

    } catch (error) {
        res.status(500).send({message: "Internal Server Error",error: error?.message})
    }
})

router.get('/:id',validate, async (req, res) => {
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
module.exports = router