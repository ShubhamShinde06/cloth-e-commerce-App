import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }


try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    //console.log('Decoded Token:', decoded);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
     // console.error('Invalid signature:', err.message);
    } else if (err.name === 'TokenExpiredError') {
      //console.error('Token expired:', err.message);
    } else {
      //console.error('Token verification error:', err.message);
    }
  }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in authUser",
//     });
//   }
next()
};

export default authUser;
