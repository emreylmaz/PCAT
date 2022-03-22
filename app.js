const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const express = require('express');

const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  /*res.sendFile(path.resolve(__dirname, 'views/index.ejs'));*/
  res.render('add');
});
app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

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
});
app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', (req, res) => {
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
});
app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  /*fs.existsSync(deletedImage, (exists) => {
    if (exists) {
      console.log('File exists.');
    } else {
      fs.unlinkSync(deletedImage);
    }
  });*/
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running port: ${port}`);
});
