const mongoose = require('mongoose');

const Company = mongoose.model('Company');

module.exports = {
    saveComment: async (commentData) => {
        Company.findOneAndUpdate({ _id: commentData.idCompany },
        { $push: {comments: { idUser: commentData.user ,  text: commentData.text , userName: commentData.userName }} },
        {useFindAndModify: false},
        (err, res) => {
            if (err) console.log('err ', err);
        })
    },

    getComments: async (req, result, next) => {
        Company.findOne({_id: req.query.id}, (err, res) => {
            if(err) console.log('err ', err);
            if(res.comments) return result.status(200).json(res.comments); 
            else return result.status(404).json('nothing is found')
        })
    }
}