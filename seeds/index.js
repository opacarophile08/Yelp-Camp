const mongoose = require("mongoose");
const Campground = require("../models/campground.js");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Error");
  });

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const price = Math.floor(Math.random() * 100) + 1;
    const random1000 = cities[Math.floor(Math.random() * 1000)];
    const camp = new Campground({
      author: "643e97de9f28f5f53249d62d",
      location: `${random1000.city}, ${random1000.state}`,
      geometry: {
        type: "Point",
        coordinates: [random1000.longitude, random1000.latitude],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dszmcizxu/image/upload/v1682153004/YelpCamp/m4sr8chrsmat5xriplna.jpg",
          filename: "YelpCamp/m4sr8chrsmat5xriplna",
        },
        {
          url: "https://res.cloudinary.com/dszmcizxu/image/upload/v1682153006/YelpCamp/hjfcobzeicj0ggrfjqtc.jpg",
          filename: "YelpCamp/hjfcobzeicj0ggrfjqtc",
        },
      ],
      description:
        "  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tempora recusandae nulla, veritatis culpa distinctio, dolore doloribus iusto inventore nam odio illum maxime obcaecati neque explicabo ratione, voluptatum nesciunt beatae?",
      price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
