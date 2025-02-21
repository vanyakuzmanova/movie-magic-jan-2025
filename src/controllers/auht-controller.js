import { Router } from "express";

const authController = Router();

authController.get('/', (req, res) =>{
    res.render('auth/register', )
});

export default authController;