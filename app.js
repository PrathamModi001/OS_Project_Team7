const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const path = require('path')
const cors = require("cors")

const app = express();
app.set('layout', './includes/main')
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

const MongoDB_URI = "mongodb+srv://modii:pratham@mycluster.l92tp0u.mongodb.net/Team7DB"

const projectRoutes = require("./server/router/projectRoutes")
const projectController = require('./server/controller/projectController')

app.use(projectRoutes)

// if a route doesnt fall in any of the above routes: then show 404 page: 
app.use(projectController.get404);

mongoose.set('strictQuery',false);
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Using Port ${PORT}`)
        });
    })
    .catch(err => {
        console.log(err);
    });