const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = '../public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = uploadDir + '/' + uploadImage.name;

  uploadImage.mv(uploadPath, async (err) => {
    if (err) {
      console.log(err);
      res.redirect('/add');
    } else {
      const photo = new Photo({
        title: req.body.title,
        description: req.body.description,
        image: '/uploads/' + uploadImage.name,
      });
      await photo.save();
      res.redirect('/');
    }
  });
};

exports.updatePhoto = async (req, res) => {
  Photo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, photo) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/photos/${req.params.id}`);
      }
    }
  );
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
