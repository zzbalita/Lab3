var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MD18402' });
});

router.post('/add_user', function(req, res, next) {
  // Add user implementation
});

router.get('/home', function(req, res, next) {
  res.render('home', { data: 'MD18402', point: 10 });
});

router.get('/chitietsp', function(req, res, next) {
  let jsonData = `{
    "title": "The Basics - Networking",
    "description": "Your app fetched this from a remote endpoint!",
    "movies": [
      { "id": "1", "title": "Star Wars", "releaseYear": "1977" },
      { "id": "2", "title": "Back to the Future", "releaseYear": "1985" },
      { "id": "3", "title": "The Matrix", "releaseYear": "1999" },
      { "id": "4", "title": "Inception", "releaseYear": "2010" },
      { "id": "5", "title": "Interstellar", "releaseYear": "2014" }
    ]
  }`;
  res.send(jsonData);
  // res.render('chitietsp');
});

// Connect to MongoDB
const uri = 'mongodb+srv://admin4:2A3ilJ0as7EXqsnY@cluster0.0n8qgpd.mongodb.net/md18402';
const carModel = require('../carModel');

router.get('/car', async function(req, res, next) {
  await mongoose.connect(uri);

  let cars = await carModel.find();

  res.send(cars);
});

router.post('/add_car', async function(req, res, next) {
  await mongoose.connect(uri);

  let car = req.body;
  // console.log(car);

  let kq = await carModel.create(car);

  // let cars = await carModel.find();

  res.send(kq);
});

// Update a car
router.put('/update_car/:id', async function(req, res, next) {
  await mongoose.connect(uri);

  let carId = req.params.id;
  let updatedData = req.body;

  try {
    let result = await carModel.findByIdAndUpdate(carId, updatedData, { new: true });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a car
router.delete('/delete_car/:id', async function(req, res, next) {
  await mongoose.connect(uri);

  let carId = req.params.id;

  try {
    let result = await carModel.findByIdAndDelete(carId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
