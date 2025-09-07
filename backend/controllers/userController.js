const User = require('../models/userSchema');
const UserFeedback = require('../models/userFeedbackSchema');
const userAccessPermission = require('../middleware/userAccessPermision'); 
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isValidUser = await bcrypt.compare(password, findUser.password);

    if (!isValidUser) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token (assumes generateToken includes role info)
    const token = await findUser.generateToken();

    // Setting cookie
    res.cookie("userCookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    // Final response with role
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role, 
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

const signupDefault = (req,res)=>{
    res.status(200).json({"message":"Welcome to register page."});
};

const signup = async (req, res, next)=>{
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
};

module.exports={
    login,
    signupDefault,
    signup
}


