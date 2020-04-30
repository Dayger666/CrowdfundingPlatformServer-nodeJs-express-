const mongoose = require('mongoose');
const Company = mongoose.model('Company');

module.exports = {
    saveSingleRating: async(req, result, next) => {
        Company.findOneAndUpdate({ _id: req.query.idCompany },
            { $push: { rating: { idUser: req.query.idUser, personalRating: req.query.rate }} },
            {useFindAndModify: false},
            (err, res) => {
                if  (!err) return result.status(200).json('success');
            })
    },

}