import { Schema, model } from "mongoose";

//create Schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
});

//create model
const Movie = model('MOvie', movieSchema);

//export model
export default Movie;
