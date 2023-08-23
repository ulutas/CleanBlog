const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const postController = require('./controller/postController');
const pageController = require('./controller/pageController');

const app = express();
const port = process.env.PORT || 5000;

//connect db
mongoose.connect('mongodb+srv://ulutasuomer:LYH0jCustDTMX3fh@cluster0.ytdfudf.mongodb.net/clean-blog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postController.getAllPost);
app.get('/posts/:id', postController.getPost);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.post('/posts', postController.createPost);
app.get('/posts/edit/:id', pageController.getEditPage);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);  

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda açıldı...`);
});
