const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('<h1>Welcome to Auth Back End</h1><h2>Your App Works Perfectly!</h2>')
})

module.exports = router;