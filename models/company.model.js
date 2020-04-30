const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = Schema({
    idUser: String,
    userName: String,
    text: String, 
})
let ratingSchema = Schema({
    idUser: String,
    personalRating: Number,
})

let companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: {
        type: [String],
        // required: true
    },
    youTubeLink: {
        type: String,
        // required: true
    },
    sum: {
        type: Number,
        required: true
    },
    beginningDate: {
        type: Date,
        default: Date.now(), 
    },
    terminalDate: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    currentSum: {
        type: Number,
        default: 0
    },
    comments: [commentSchema],
    rating: [ratingSchema]
});



mongoose.model('Company', companySchema, 'companies');

// mongoose.model('User', userSchema, 'users');