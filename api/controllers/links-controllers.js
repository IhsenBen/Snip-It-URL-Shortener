const { check, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const User = require('../models/User');
const Link = require('../models/Link');
const HttpError = require('../models/error');

//Save link with unlogged user
const convertAndSaveLinkUnlogged = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { longUrl } = req.body;
  const shortUrl = nanoid(10); // 1% probability of data collision in 139 years
  const count = await Link.countDocuments({ longUrl }).catch((err) => {
    return next(
      new HttpError('Something went wrong, could not count links', 500)
    );
  });
  const newLink = new Link({
    longUrl,
    shortUrl,
    user: 'Annonymous',
    count: +count,
  });
  try {
    //count how many times longUrl was used in db
    await newLink.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not create link', 500)
    );
  }
  res.json({
    message: 'Link created',
    link: newLink,
  });
};

//Save short link with logged user
const convertAndSaveLink = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { longUrl } = req.body;
  const shortUrl = nanoid(10); // 1% probability of data collision in 139 years
  const { userId } = req.params;
  //check if user exists
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find user', 500)
    );
  }
  if (!user) {
    return next(new HttpError('Could not find user for provided id', 404));
  }
  const count = await Link.countDocuments({ longUrl }).catch((err) => {
    return next(
      new HttpError('Something went wrong, could not count links', 500)
    );
  });
  const newLink = new Link({
    longUrl,
    shortUrl,
    userId,
    count: +count,
  });
  try {
    await newLink.save();
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not save link', 500)
    );
  }
  res.json({
    message: 'Link created',
    link: newLink,
  });
};

// get long link with the short id
const getLongUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  let link;
  try {
    link = await Link.findOne({ shortUrl });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find link',
      500
    );
    res.json(error.message);
    return next(error);
  }
  if (!link) {
    const error = new HttpError('Could not find link for provided id', 404);
    res.json(error.message);
    return next(error);
  }
  res.json({
    message: 'Link found',
    link,
  });
};

// redirect to long link
const handleRedirect = async (req, res, next) => {
  const { shortUrl } = req.params;
  let link;
  try {
    link = await Link.findOne({ shortUrl });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find link',
      500
    );
    res.json(error.message);
    return next(error);
  }
  if (!link) {
    const error = new HttpError('Could not find link for provided id', 404);
    res.json(error.message);
    return next(error);
  }
  // add 1 to clicks
  link.clicks++;
  try {
    await link.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update link',
      500
    );
    res.json(error.message);
    return next(error);
  }
  res.redirect(link.longUrl);
};

// Get 10 last links for home page ( without stats)
const getAllLinks = async (req, res, next) => {
  let links;
  try {
    //get 10 last links with shortUrl and longUrl fields
    links = await Link.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('shortUrl longUrl');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find links',
      500
    );
    res.json(error.message);
    return next(error);
  }
  if (!links) {
    const error = new HttpError('Could not find links', 404);
    res.json(error.message);
    return next(error);
  }

  res.json({
    links,
  });
};

//Get links by user
const getLinksByUser = async (req, res, next) => {
  //get user links
  const { userId } = req.params;
  let links;
  try {
    links = await Link.find({ userId }).sort({ createdAt: -1 });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find links',
      500
    );
    res.json(error.message);
    return next(error);
  }
  if (!links) {
    const error = new HttpError('Could not find links', 404);
    res.json(error.message);
    return next(error);
  }
  res.json({
    links,
  });
};

module.exports = {
  convertAndSaveLinkUnlogged,
  convertAndSaveLink,
  getLongUrl,
  handleRedirect,
  getAllLinks,
  getLinksByUser,
};
