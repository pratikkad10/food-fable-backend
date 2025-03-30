require('dotenv').config();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { userModel } = require("../models/user.model");

async function signupHandler(req, res) {
  try {
    const { name, email, password,confirmPassword, accountType } = req.body;

    if (!name || !email || !password || !confirmPassword || !accountType) {
      return res.status(400).json({ 
        error: "All fields are required. Please provide name, email, password, confirmPassword, and accountType." 
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        error: "Password and Confirm Password do not match." 
      });
    }
    

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already signed up." });
    }

    const hashedPassword=await bcrypt.hash(password, 10);

    const newUser=await userModel.create({
        name,email,password:hashedPassword, accountType
    })
    res.status(200).json({ message: "User signed up.", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error:error });
  }
}

async function signinHandler(req, res) {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
          return res.status(400).json({ 
            error: "All fields are required. Please provide  email, password." 
          });
        }


        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not exist." });
        }
        const passwordMatch=await bcrypt.compare(password, user.password);
        if(user && passwordMatch){

            const payload = {
              email:user.email,
              id: user._id.toString(),
              accountType:user.accountType
            }
            const token=jwt.sign(payload, process.env.JWT_SECRET_USER ,{expiresIn:"2h"});
            res.status(200).json({ 
                message: "User signed in.", token:token 
            });

            user.token = token;
            user.password=undefined;

        }
      } catch (error) {
        res.status(500).json({ message: "Internal server error." });
      }
}


module.exports ={
    signupHandler,signinHandler
}
