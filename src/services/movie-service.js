import movies from '../movies.js';
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
    create(movieData){
        const result = Movie.create({
            ... movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        });

        return result;
    },
}