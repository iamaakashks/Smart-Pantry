const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

router.post('/register', async (req, res)=>{
    const {username, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const user = await User.create({
            username, email, password
        })
        if(user){
            res.status(201).json({
                message: "User registered successfully"
            });
        }
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
})
router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(User && (await user.matchPassword(password))){
            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token: generateToken(user._id),
            })
        }else{
            res.status(401).json({message: "Invalid email or password"});
        }
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
})
module.exports = router;