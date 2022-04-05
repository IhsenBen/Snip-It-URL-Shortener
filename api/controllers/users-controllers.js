const { validationResult } = require('express-validator');

const geoip = require('geoip-country');
const requestIp = require('request-ip');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/error');
const User = require('../models/User');

//Create User/Register
const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { username, password, email } = req.body;
  const ip = requestIp.getClientIp(req).substring(7);
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : 'Unknown';

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new HttpError(
        'User already exists, please Log-in Instead',
        422
      );
      return next(error);
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      const error = new HttpError(
        'Username already exists, please choose another one',
        422
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create user',
      500
    );
    return next(error);
  }
  //create new user
  const newUser = new User({
    username,
    password: await bcrypt.hash(password, 12),
    email,
    country,
  });
  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not create user', 500)
    );
  }
  let token;
  try{
    token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  }


  res.json({
    newUser,
  });
};

//Login User
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find user', 500)
    );
  }
  if (!user) {
    return next(
      new HttpError('Could not find user for provided username', 404)
    );
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return next(new HttpError('Password is incorrect', 401));
  }
  let token;
  try{
    token = jwt.sign(
      { userId: user.id,  user: user.username },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    
  res.json({
    user,
  });
};

//Get User by ID
const getUser = async (req, res, next) => {
  const { uid } = req.params;
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find user', 500)
    );
  }
  if (!user) {
    return next(new HttpError('Could not find user for provided id', 404));
  }

  res.json({
    message: 'User found',
    user,
  });
};

//Get All Users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find users', 500)
    );
  }
  if (!users) {
    return next(new HttpError('Could not find users', 404));
  }
  res.json({
    message: 'Users found',
    users,
  });
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers,
};
