// const jwt = require('jsonwebtoken');

// function checkAuthToken(req, res, next) {
//     const authToken = req.cookies.authToken;
//     const refreshToken = req.cookies.refreshToken;
    
//     console.log('Auth Token:', authToken);
//     console.log('Refresh Token:', refreshToken);

//     if (!authToken || !refreshToken) {
//         return res.status(401).json({ message: 'Authentication failed: No authToken or refreshToken provided', ok: false });
//     }

//     jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
//         if (err) {
//             // authToken verification failed
//             console.error('Error verifying authToken:', err);

//             // Check refreshToken
//             jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
//                 if (refreshErr) {
//                     // Both tokens are invalid
//                     console.error('Error verifying refreshToken:', refreshErr);
//                     return res.status(401).json({ message: 'Authentication failed: Both tokens are invalid', ok: false });
//                 }

//                 // Refresh authToken and refreshToken
//                 const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
//                 const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m' });

//                 res.cookie('authToken', newAuthToken, { httpOnly: true, secure: false, sameSite: 'None' });
//                 res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: false, sameSite: 'None' });

//                 req.userId = refreshDecoded.userId;
//                 req.ok = true;
//                 next();
//             });
//         } else {
//             // authToken verification succeeded
//             req.userId = decoded.userId;
//             next();
//         }
//     });
// }

// module.exports = checkAuthToken;

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const checkAuthToken = asyncHandler (async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; 
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;
            next();
            console.log(decoded);
        })
        if(!token){
            res.status(401);
            throw new Error("User is not authorized")
        }
    }
})

module.exports = checkAuthToken;
