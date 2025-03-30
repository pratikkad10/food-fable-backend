const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {

  try {
    // const token = req.headers["token"];
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing!"
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_USER);
      req.user = decode;
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "token is invalid!",
        error: error.message
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while validating token !",
      error: error.message
    });
  }
};

exports.ownerAuth = (req, res, next) => {
  try {
    if (req.user.accountType !== "Owner") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for owner!"
      });  
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while validating owner !",
      error: error.message
    });
  }
};

exports.userAuth = (req, res, next) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for user!"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while validating user !",
      error: error.message
    });
  }
};


exports.adminAuth = (req, res, next) => {
    try {
      if (req.user.accountType !== "Admin") {
        return res.status(401).json({
          success: false,
          message: "This is protected route for admin!"
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong while validating admin !",
        error: error.message
      });
    }
  };
  