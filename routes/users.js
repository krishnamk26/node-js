const express = require('express')
const router = express.Router()
const users = [
    {
        name:"Krishna",
        email:"krish@gmail.com",
        password:"Admin@123",
        role:"student"
    },
    {
        name:"Karthi",
        email:"karthi@gmail.com",
        password:"kart@123",
        role:"student"
    },
    {
        name:"Deepan",
        email:"Deeph@gmail.com",
        password:"Deepan@123",
        role:"student"
    },
    {
        name:"Udesh",
        email:"udesh@gmail.com",
        password:"udesh@123",
        role:"student"
    },
]

router.get('/',(req,res)=>{
    res
    .status(200)
    .send({
        message:"Data Fatched Successfully",
        data:users
    })
})

router.get('/:id',(req,res)=>{
    if(Number(req.params.id)<users.length){
        res
        .status(200)
        .send({
            message:"User Data Fatched Successfully",
            data:users[req.params.id]
        })
    }
    else{
        res
        .status(400)
        .send({
            massage:"User Not Found"
        })
    }
})

router.post('/',(req,res)=>{
    users.push(req.body)
    res
    .status(200)
    .send({
        message:"Users Saved Successfully"
    })
})

router.put('/:id',(req,res)=>{
    if(Number(req.params.id)<users.length){
        users.splice(req.params.id,1,req.body)
        res
        .status(200)
        .send({
            message:"User Data Edited Successfully",
            data:users[req.params.id]
        })
    }
    else{
        res
        .status(400)
        .send({
            massage:"User Not Found"
        })
    }
})

router.delete('/:id',(req,res)=>{
    if(Number(req.params.id)<users.length){
        users.splice(req.params.id,1)
        res
        .status(200)
        .send({
            message:"User Data Deleted Successfully",
            data:users[req.params.id]
        })
    }
    else{
        res
        .status(400)
        .send({
            massage:"User Not Found"
        })
    }
})

module.exports = router