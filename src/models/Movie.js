import { Schema, model, Types } from "mongoose";

//create Schema
const movieSchema = new Schema({
    title: {
        type:String,
        required: [true, 'Title is required'],
        minLength: [5, 'Title should be at least 5 characters'],
        maxLength: 250,
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumreic, digits and white space only!']
    },
    category: {
        type:String,
        required: true,
        enum: [
            'tv-show',
            'animation',
            'movie',
            'documentary',
            'short-film',
        ]
    },
    genre: {
        type:String,
        minLength: [5, 'Title should be at least 5 characters'],
        maxLength: 250,
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumreic, digits and white space only!']
    },
    director: {
        type:String,
        minLength: [5, 'Title should be at least 5 characters'],
        maxLength: 250,
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumreic, digits and white space only!']
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: 20,
        maxLength: 250,
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumreic, digits and white space only!']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

//create model
const Movie = model('Movie', movieSchema);

//export model
export default Movie;
