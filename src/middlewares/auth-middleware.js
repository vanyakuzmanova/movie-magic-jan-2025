import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'MYSECRET';

export const authMiddleware = (req, res, next) => {
    //get token
    const token = req.cookies['auth'];

    //for guest user
    if (!token) {
        return next();
    }

    //validate token for logged users
    try {
        const decodedToken = jwt.verify(token, SECRET);

         //attach decoded token to request
         req.user = decodedToken;

         next();
    } catch (err) {
        //TODO invalid token
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }


    //Don't forget guest users


}