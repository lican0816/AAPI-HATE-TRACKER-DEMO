const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const incidents = await Tour.find();

  console.log(incidents);

  res.status(200).render('overview', {
    title: 'All Incidents',
    incidents
  });
});

exports.reportIncident = (req, res, next) => {
  res.status(200).render('report', {
    title: 'Report incident'
  });
};

exports.getTour = catchAsync(async (req, res, next) => {
  const incident = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review user createdAt'
  });

  if (!incident) {
    return next(new AppError('There is no incident with that name.', 404));
  }

  res.status(200).render('incident', {
    title: `${incident.name}`,
    incident
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.createAccount = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
