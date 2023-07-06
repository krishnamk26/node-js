const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('<h1> Welcome to Express App </h1>')
})

router.post('/',(req,res)=>{
    console.log(req.body)
    res.send({
        message:"Data Saved Succusfully"
    })
})

module.exports = router