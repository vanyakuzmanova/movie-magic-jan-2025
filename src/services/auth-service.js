import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'MYSECRET'
export default{
    register(userData){
        return User.create(userData);
    },
    async login(email, password){
        
        //check if user exist
        const user = await User.findOne( {email} );
        if(!user){
            throw new Error('Invalid email');
        };
        
        //check password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            throw new Error('Invalid password');
        }
        
        //generate token
        const payload = {
            id: user.id,
            email: user.email
        };
        const token = jwt.sign(payload, SECRET, {expiresIn:'2h'});

        //return 

        return token;
    }
};