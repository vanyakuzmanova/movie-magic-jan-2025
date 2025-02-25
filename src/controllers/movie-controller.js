import { Router } from 'express';
import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';

const movieController = Router();

movieController.get('/search', async (req,res) =>{
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
})

movieController.get('/create', (req,res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) =>{
    const newMovie = req.body;
    const userId = req.user?.id;
    
    await movieService.create(newMovie, userId);
   
    res.redirect('/');
})

movieController.get('/:movieId/details', async (req,res) => {
    console.log(req.user);
    const movieId = req.params.movieId;
  
    const movie = await movieService.getOneWithCasts(movieId);

   //const isCreator = movie.creator.toString() === req.user.id;
   const isCreator = movie.creator && movie.creator.toString() === req.user?.id;
   //const isCreator = movie.creator?.equals(req.user?.id);
   
    res.render('movie/details', { movie, isCreator});
})

movieController.get('/:movieId/attach-cast', async (req,res) => {
    const movieId  = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.casts});

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    console.log(req.body)

    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', async (req,res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if(!movie.creator?.equals(req.user?.id)){
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});


movieController.get('/:movieId/edit', async (req, res) =>{
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);   

    const categories = getCategoriesViewData(movie.category);
    console.log(categories)

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) =>{
    const movieData = req.body;
    const movieId = req.params.movieId;

    //TODO: if creator
    await movieService.update(movieId, movieData);
    res.redirect(`/movies/${movieId}/details`);

});

function getCategoriesViewData(category){
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short-film',
    }
    const categories = Object.keys(categoriesMap).map(value =>({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }))

    return categories;
}


export default movieController;