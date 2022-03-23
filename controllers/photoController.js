const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1; // pagination
  const photosPerPage = 3; //sayfa başına gösterilecek fotoğraf sayısı

  const totalPhotos = await Photo.find().countDocuments(); //tüm fotoğraf sayısını buluyoruz

  const photos = await Photo.find({}) //tüm fotoğrafları ilgili condiotına göre buluyoruz
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);

  res.render('index', {
    //index.ejs dosyasının içeriğini gönderiyoruz
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });

  /* console.log(req.query);
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });*/
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = __dirname + '/../public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

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
