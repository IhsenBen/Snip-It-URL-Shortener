const router = require('express').Router();
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

//Get Users route ✔
router.get('/', usersController.getUsers);

//Get Single User route ✔
router.get('/:uid', usersController.getUser);

//Create User route ✔
router.post(
  '/register',
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
  ],
  usersController.createUser
);

//Login User route ✔
router.post(
  '/login',
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],
  usersController.loginUser
);

module.exports = router;
