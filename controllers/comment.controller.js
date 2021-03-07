const mongoose = require('mongoose');

const Company = mongoose.model('Company');

module.exports = {
    saveComment: async (commentData, result, next) => {
       await  Company.findOneAndUpdate({ projectID: commentData.body.projectID},
        { $push: {comments: { idUser: commentData.body.userID ,userImg:commentData.body.img,userName:commentData.body.userName, text: commentData.body.commentText }} },
        {useFindAndModify: false},
        (err, res) => {
            if  (!err) return result.status(200).json(res);
        })
    },

    getComments: async (req, result, next) => {
        Company.findOne({_id: req.query.id}, (err, res) => {
            if(err) console.log('err ', err);
            if(res.comments) return result.status(200).json(res.comments);
            else return result.status(404).json('nothing is found')
        })
    }
};
