import { Router  } from "express";
//import castServicce from 

const castController = Router();

castController.get('/create',(req,res)=> {
    res.render('cast/create');

});

export default castController;