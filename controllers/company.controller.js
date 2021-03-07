const mongoose = require('mongoose');

const Company = mongoose.model('Company');

module.exports = {
    saveCompany: async (req, res, next) => {
        // let companyData = JSON.parse(req.query.data);
        let newCompany = new Company({
            userID: req.body.userID,
            userName:req.body.userName,
            projectID:await Company.collection.countDocuments()+1,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            location: req.body.location,
            images:req.body.images,
            youTubeLink: req.body.youTubeLink,
            donateGoal: req.body.donateGoal,
            duration: req.body.duration,
        });
        await newCompany.save();
        return res.status(200).json(newCompany);
    },

    getCompanies: (req, res, next) => {
        Company.find({}, (err, companies) => {
            if (!err) return res.status(200).json(companies);
            throw new Error(err);
        });
    },

    getCompanyDetails: (req, res, next) => {
        // if (req.query.id) {
            Company.findOne({ projectID: req.params.projectID }, (err, company) => {
                if (!err) return res.status(200).json(company);
                throw new Error(err);
            });
        // } else if (req.query.userId) {
        //     Company.find({ userId: req.query.userId }, (err, companies) => {
        //         if (!err) return res.status(200).json(companies);
        //         throw new Error(err);
        //     });
        // }
    },

    getCompanyByCategory: async(req, res, next) => {
        let projects=[];
        for(const category of req.body.projectCategory) {
            console.log(category);
           const project =  await Company.find({category:category });
            projects.push(...project);
        }
         return res.status(200).json(projects);
    },
    getCompaniesBuUserId: async (req,res,next)=>{
        Company.find({userID:req.body.userID}, (err, companies) => {
            if (!err) return res.status(200).json(companies);
            throw new Error(err);
        });
    },
    removeCompanyById: async (req, result, next) => {
        Company.deleteOne({ projectID: req.body.projectID },  (err, res) => {
            if (!err) return result.status(200).json('success');
            throw new Error(err);
        });
    },
    donate: async (req, result, next) => {

        Company.findOneAndUpdate({ projectID: req.body.projectID }, { currentSum: req.body.currentSum }, { useFindAndModify: false }, (err, res) => {
            if (!err) return result.status(200).json('success');
            throw new Error(err);
        });
    },



};
