import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';


const app = express();


//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers:{
        showRating: showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

//express configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false})); //Learn express to parse data

//db configuration
try{
    const uri = 'mongodb://localhost://21017/magic-movies-jan2025'
    await mongoose.connect(uri);

    console.log('DB connected succesfully')
}catch (err){
    console.log('cannot connected to Db')
    console.err(err.message)
}


//setup routes
app.use(routes);

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));