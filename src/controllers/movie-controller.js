import { Router } from 'express';

import movieService, { findMovie } from '../services/movie-service.js';

const movieController = Router();

import { movieController } from "../services/movie-service.js"

movieController.get('/create', (req,res) => {
    res.render('create');
});

movieController.get('/:movieId/details', (req,res) => {
    const movieId = req.params.movieId;
    console.log(movieId);
    const movie = movieService.findOne(movieId);
    console.log(movie);
    res.render('details');
})

export default movieController;