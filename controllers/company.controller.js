const mongoose = require('mongoose');

const Company = mongoose.model('Company');

module.exports = {
    saveCompany: async (req, res, next) => {
        let companyData = JSON.parse(req.query.data);
        let newCompany = new Company({
            userId: companyData.id,
            name: companyData.name,
            category: companyData.category,
            description: companyData.description,
            youTubeLink: companyData.youtubeLink,
            sum: companyData.sum,
            terminalDate: companyData.date,
            files: companyData.files,
        });
        await newCompany.save();
        return res.status(200).json('success');
    },

    getCompanies: (req, res, next) => {
        Company.find({}, (err, companies) => {
            if (!err) return res.status(200).json(companies);
            throw new Error(err);
        });
    },

    getCompanyDetails: (req, res, next) => {
        if (req.query.id) {
            Company.findOne({ _id: req.query.id }, (err, company) => {
                if (!err) return res.status(200).json(company);
                throw new Error(err);
            });
        } else if (req.query.userId) {
            Company.find({ userId: req.query.userId }, (err, companies) => {
                if (!err) return res.status(200).json(companies);
                throw new Error(err);
            });
        }
    },

    getCompanyByCategory: (req, res, next) => {
        Company.find({ category: req.query.category }, (err, companies) => {
            if (!err) return res.status(200).json(companies);
            throw new Error(err);
        });
    },

    donate: async (req, result, next) => {
        Company.findOneAndUpdate({ _id: req.query.id }, { currentSum: req.query.donate }, { useFindAndModify: false }, (err, res) => {
            if (!err) return result.status(200).json('success');
            throw new Error(err);
        });
    },



};