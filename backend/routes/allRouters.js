const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const UserFeedback = require('../models/userFeedbackSchema');
const userAccessPermission = require('../middleware/userAccessPermision'); 
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

router.get("/",userAccessPermission,(req, res)=>{
    res.status(200).json({"message":"Welcome to home page."});
})


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return res.status(401).json({ "message": "Invalid credentials." });
        }

        const isValidUser = await bcrypt.compare(password, findUser.password);
        if (isValidUser) {
            const token = await findUser.generateToken();
            // Set the cookie with the token
            res.cookie("userCookie", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000), 
            httpOnly: true,
            sameSite: 'Lax', // or 'None' for cross-site
            secure: false,   // Set to true in production with HTTPS
            });

            res.status(200).json({ "message": "Login successful.", "token": token });
        } else {
            res.status(401).json({ "message": "Invalid credentials." });
        }
    } catch (error) {
        console.log("Error in login post router.");
        next(error);
    }
});

router.get("/register",(req,res)=>{
    res.status(200).json({"message":"Welcome to register page."});
})

router.post("/register", async (req, res, next)=>{
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({"message":"All fields are required."});
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name: name,
                email: email.toLowerCase(),
                password: hashedPassword
            })
            await newUser.save()
            .catch((error) => {
                if (error.code === 11000) {
                    return res.status(400).json({"message":"Email already exists."});
                }
                return res.status(500).json({"message":"Internal Server Error"});
            });
        }

        res.status(201).json({"message":"User registered successfully."});
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
})

//logout route
router.get("/logout",userAccessPermission, async (req, res, next) => {
    try {
        // Clear the cookie by setting its expiration date to the past
        res.cookie("userCookie", "", {
            expires: new Date(Date.now() - 1000), // Set to a past date
            httpOnly: true,
            sameSite: 'Lax', // or 'None' for cross-site
            secure: false,   // Set to true in production with HTTPS
        });

        // removing the token from the database
        const user = await User.findById(req.userInfo._id);
        if (!user) {
            return res.status(404).json({"message":"User not found."});
        }else{
            user.tokens = [];
        await user.save();
        }

        res.status(200).json({"message":"Logout successful."});


    } catch (error) {
        console.log("Error in logout get router.");
        next(error);
    }
});

router.get("/me", userAccessPermission, (req, res) => {
    res.status(200).json({userInfo: req.userInfo, message: "User information retrieved successfully."});
});


//user feedback route
router.get("/feedback",(req, res)=>{
    res.status(200).json({"message":"Welcome to feedback page."});
})

router.post("/feedback", async (req,res,next)=>{
    try {
        const {userId, userName, feedbackText, rating} = req.body;
        if(!userId || !userName || !feedbackText || !rating) {
            return res.status(400).json({"message":"All fields are required."});
        }else{
            const newFeedback = new UserFeedback({
                userId: new mongoose.Types.ObjectId(userId),
                userName: userName,
                feedbackText: feedbackText,
                rating: rating
            });
            await newFeedback.save()
            .catch((error) => {
                return res.status(500).json({"message":"Internal Server Error"});
            });
            res.status(201).json({"message":"Feedback submitted successfully."});
        }
    } catch (error) {
        console.log("Error in sending feedback post router.");
        next(error);
    }
})

module.exports = router;