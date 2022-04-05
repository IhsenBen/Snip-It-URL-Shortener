const router = require('express').Router();
const { check } = require('express-validator');

const linksController = require('../controllers/links-controllers');

// get all links ✔
router.get('/', linksController.getAllLinks);

//save short link with unlogged user ✔
router.post('/', [ check('longUrl').not().isEmpty().withMessage('Long url is required') ], linksController.convertAndSaveLinkUnlogged);

// save short link with user login ✔
router.post('/user/:userId', [ check('longUrl').not().isEmpty().withMessage('Long url is required') ], linksController.convertAndSaveLink);

// get Links by user id ✔
router.get('/user/:userId', linksController.getLinksByUser);


// redirect to long link ✔
router.get('/:shortUrl', linksController.handleRedirect);




module.exports = router;
