import { Router } from "express";
import authService from "../services/auth-service";

const authController = Router();

authController.get('/register', (req, res) =>{
    res.render('auth/register' )
});

authController.post('/register', async (req, res) =>{
    const userData = req.body;

    console.log(userData);

    await authService.register(userData);

    res.end();
});

export default authController;