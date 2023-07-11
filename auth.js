const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRound = 10;

let hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

let createToken = async ({ email, role, name, _id }) => {
    let token = await jwt.sign( //create a new token
        { email, role, name,id:_id }, // this name payload
        process.env.JWT_SK,
        { expiresIn: process.env.JWT_EXPIRE }
    )
    return token
}

let decodeToken = async (token) => {//decodeing the token
    return jwt.decode(token)
}

let validate = async (req, res, next) => {// validate if token is not expired 
    // console.log(req)
    // console.log(req.headers.authorization)
    let token = req?.headers?.authorization?.split(" ")[1]
    //console.log(token)
    //let payload = await decodeToken(token)
    //console.log(payload)
    if (token) {
        let { exp } = await decodeToken(token)
        //console.log(exp,(Math.round((+new Date()/1000))))
        if ((Math.round((+new Date() / 1000))) < exp)
            next()
        else {
            res.status(401).send({ message: "Token Expired" })
        }
    }
    else {
        res.status(401).send({ message: "Token Not Found" })
    }
}

let adminGaurd = async (req, res, next) => { // allow only the admin access further
    // console.log(req)
    // console.log(req.headers.authorization)
    let token = req?.headers?.authorization?.split(" ")[1]
    //console.log(token)
    //let payload = await decodeToken(token)
    //console.log(payload)
    if (token) {
        let { role } = await decodeToken(token)
        if (role==='admin')
            next()
        else {
            res.status(401).send({ message: "Only Admin Can Acccess" })
        }
    }
    else {
        res.status(401).send({ message: "Token Not Found" })
    }
}

module.exports = { createToken, decodeToken, validate, adminGaurd, hashPassword, comparePassword }