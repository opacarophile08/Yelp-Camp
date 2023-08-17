if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const campgroundRoutes = require("./routes/campgrounds.js");
const reviewRoutes = require("./routes/reviews.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRoutes = require("./routes/users.js");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
// const helmet = require("helmet");

mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Error");
  });

const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());
// app.use(helmet());

// const scriptSrcUrls = [
//   "https://stackpath.bootstrapcdn.com",
//   "https://api.tiles.mapbox.com",
//   "https://api.mapbox.com",
//   "https://kit.fontawesome.com",
//   "https://cdnjs.cloudflare.com",
//   "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//   "https://kit-free.fontawesome.com",
//   "https://stackpath.bootstrapcdn.com",
//   "https://api.mapbox.com",
//   "https://api.tiles.mapbox.com",
//   "https://fonts.googleapis.com",
//   "https://use.fontawesome.com",
// ];
// const connectSrcUrls = [
//   "https://api.mapbox.com",
//   "https://*.tiles.mapbox.com",
//   "https://events.mapbox.com",
// ];
// const fontSrcUrls = [];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", "blob:"],
//       childSrc: ["blob:"],
//       objectSrc: [],
//       imgSrc: [
//         "'self'",
//         "blob:",
//         "data:",
//         "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
//         "https://images.unsplash.com",
//       ],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL || "mongodb:// 127.0.0.1:27017/yelp-camp",
    touchAfter: 24 * 60 * 60,
  }),
  name: "session",
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  //console.log(req.session);
  //console.log(req.query);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
  console.log("Serving On Port 8080");
});
