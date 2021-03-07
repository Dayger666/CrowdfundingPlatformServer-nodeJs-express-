const express = require('express');
const router = express.Router();
const jwtHelper = require('../configuration/jwtHelper');
const passport = require('passport');

const userController = require('../controllers/user.controller');
const companyController = require('../controllers/company.controller.js');
const ratingController = require('../controllers/rating.controller');
const commentController = require('../controllers/comment.controller');

router.post('/auth/register', userController.register);
router.post('/auth/authenticate', userController.authenticate);
router.get('/auth/me', jwtHelper.verifyJwtToken, userController.userProfile);
router.post('/oauth/facebook', passport.authenticate('facebook-token', { session: false }), userController.facebookOauth);
router.post('/oauth/google', passport.authenticate('google-token', {session: false}), userController.googleOauth);

router.post('/projects', companyController.saveCompany);
router.get('/projects', companyController.getCompanies);
router.post('/projectsByUserId', companyController.getCompaniesBuUserId);
router.delete('/projects', companyController.removeCompanyById);
router.get('/projects/details/:projectID?', companyController.getCompanyDetails);
router.post('/projectsByCategory', companyController.getCompanyByCategory);
router.put('/donate', companyController.donate);

router.get('/getOldComments', commentController.getComments);
router.put('/comments', commentController.saveComment);

router.put('/saveRating', ratingController.saveSingleRating);
// router.get('/getRating', ratingController.getRating);


module.exports = router;
