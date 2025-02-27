import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name should be at least 5 characters'],
        match: [/^[a-zA-Z 0-9]+$/, 'Name should be alphanumreic, digits and white space only!']
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
    },
    born: {
        type: String,
        minLength: 10,
        match: /^[a-zA-Z 0-9]+$/,
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v){
                return /^https?:\/\//.test(v);
            },
            message: (props) =>`${props.value} is invalid image url!`
        }
    },


});

const Cast = model('Cast', castSchema);

export default Cast;
