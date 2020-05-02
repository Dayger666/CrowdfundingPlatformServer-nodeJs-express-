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
    userID: {
        type: String,
        required: true
    },
    companyID:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    images: {
        type: [String],
        // required: true
    },
    youTubeLink: {
        type: String,
        // required: true
    },
    donateGoal: {
        type: Number,
        required: true
    },
    beginningDate: {
        type: Date,
        default: Date.now(), 
    },
    duration: {
        type: Number,
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