//import movies from '../movies.js';

import Movie from '../models/Movie.js'

export default{
    getAll( filter = {}){
        let query =  Movie.find({});

        //todo add case insensitive search
         if(filter.search){
             query = query.where({title: filter.search});
         }
         //todo add case insensitive search
        if(filter.genre){
            query = query.where({ genre: filter.genre});
        }
        if(filter.year){
            query = query.where({year: Number(filter.year)});
        }

        return query;
    },
    getOne(movieId){
        //TODO: if movie is missing
        const result = Movie.findById(movieId);

        return result;
    },
    getOneWithCasts(movieId){
        return this.getOne(movieId).populate('casts');
    },
    create(movieData, creatorId){
        const result = Movie.create({
            ... movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId
        });

        return result;
    },
    async attachCast(movieId, castId){
        //first way
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        
        // await movie.save();

        // return movie;

        //second way
        return Movie.findByIdAndUpdate(movieId, { $push: {casts: castId} } );
    }
}