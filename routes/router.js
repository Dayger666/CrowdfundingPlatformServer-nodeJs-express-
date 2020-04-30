const express = require('express');
const router = express.Router();
const jwtHelper = require('../configuration/jwtHelper');
const passport = require('passport');

const userController = require('../controllers/user.controller');
const companyController = require('../controllers/company.controller.js');
const commentController = require('../controllers/comment.controller');
const ratingController = require('../controllers/rating.controller');


router.post('/auth/register', userController.register);
router.post('/auth/authenticate', userController.authenticate);
router.get('/auth/me', jwtHelper.verifyJwtToken, userController.userProfile);
router.post('/oauth/facebook', passport.authenticate('facebook-token', { session: false }), userController.facebookOauth);
router.post('/oauth/google', passport.authenticate('google-token', {session: false}), userController.googleOauth);

router.get('/saveCompany', companyController.saveCompany);
router.get('/getCompanies', companyController.getCompanies);
router.get('/getCompanyDetails', companyController.getCompanyDetails);
router.get('/getCompanyByCategory', companyController.getCompanyByCategory);
router.get('/donate', companyController.donate);

router.get('/getOldComments', commentController.getComments);

router.get('/saveRating', ratingController.saveSingleRating);
// router.get('/getRating', ratingController.getRating);


module.exports = router;