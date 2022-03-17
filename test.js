const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('test.js');

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo
/*Photo.create({
  title: 'Photo Title 2',
  description: 'Photo description 2 lorem ipsum',
});*/
/*
// read
Photo.find({}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});*/
/*
//update
const id = '62325b64addeb54c66cc992d';

Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo title 111 update',
    description: 'Photo description 111 update',
  },
  {
    new: true,
  },
  (err, data) => {
    console.log(data);
  }
);*/

//delete
const id = '623266c14cc6d7cb41779cff';

Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed..');
});
