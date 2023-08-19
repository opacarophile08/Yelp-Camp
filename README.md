
# Yelp-Camp

YelpCamp is a campground reviewing website where users can create their own campgrounds or review others' campgrounds. It is created using Node.js, Express, and MongoDB.

## Live Demo 
https://yelp-camp-krish.onrender.com/

## Images
![1](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/582dea5e-384e-4612-82da-dfa22507fd71)
![2](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/1c25d67d-609f-4778-b09b-cb382b6c6557)
![3](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/c83bd092-da67-46d2-bbff-92ff14f245df)
![4](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/de99518b-6460-4a9f-947b-8c20b20d1245)
![5](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/3f588e1d-bb92-4b1d-8dcb-e2e799b6b89e)
![6](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/80f46634-365c-4aa3-9d94-d2d527543f80)
![7](https://github.com/opacarophile08/Yelp-Camp/assets/115164224/c2bad9a8-faa9-4b3b-9cfb-5af1e12e904c)




## Features
* Authentication
  * User login with username and password
  * Admin sign-up with admin code
* Authorization
  * User cannot manage posts without being authenticated
  * User cannot edit or delete posts and comments created by other users
  * Admin can manage all posts and comments
* Manage campground posts
  * User can create, edit and delete posts and comments
  * User can search existing campgrounds by name
* Flash messages responding to users' interaction with the app
* Responsive web design

## Getting Started
### Clone or download this repository
```
git clone https://github.com/opacarophile08/Yelp-Camp.git
```
### Get mongoDB
```
Go to https://www.mongodb.com/
```
### Install dependencies
```
npm install
```
or
```
yarn install
```
### Running locally
```
Run mongod in another terminal and node app.js in the terminal with the project

Then go to localhost:3000
```
## Built With
### Front-end
* [ejs](https://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

### Back-end
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](https://mongoosejs.com/)
* [Passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

## Authors

- [Arpit Pandey](https://github.com/opacarophile08)

## Acknowledgments

- Colt Steele's Bootcamp course
