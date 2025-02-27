import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ||'MYSECRET';
export default{
    async register(userData){
        //check if password match repassword
        // if(userData.password !== userData.rePassword){
        //     throw new Error('Password  mismatch!');
        // }
        //check if email exist
        const userCount = await User.countDocuments({email: userData.email})
        if (userCount > 0){
            throw new Error('Email already exists');
        }
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