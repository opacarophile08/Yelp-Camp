const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schemas.js");
const catchAsync = require("../utils/catchAsync.js");
const reviews = require("../controllers/review.js");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  //console.log(req.user);
  if (req.user !== undefined) {
    if (!campground.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/campgrounds/${id}`);
    }
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (req.user !== undefined) {
    if (!review.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/campgrounds/${id}`);
    }
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;
