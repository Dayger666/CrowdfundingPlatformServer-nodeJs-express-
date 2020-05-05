const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = Schema({
    idUser: String,
    userImg:String,
    userName: String,
    date:{
        type: String,
        default: new Date().toLocaleString(),
    },
    text: String, 
});
let ratingSchema = Schema({
    idUser: String,
    personalRating: Number,
});

let companySchema = Schema({
    userID: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    projectID:{
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
        type: Number,
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