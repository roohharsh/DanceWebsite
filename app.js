const express = require("express");
const fs = require("fs");
const path = require("path"); 
const app = express();
// const bodyparser = require("body-parser");

// add mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewParser: true});
const port = 80;

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name : String,
    phone : String,  // order & name must be same as in contact.pug
    email : String,
    address : String,
    description : String
});
var Contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF 
app.use('/static',express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF 
app.set('view engine','pug') // Set the template engine as pug 
app.set('views',path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS 
app.get('/', (req,res)=>{
    const params = {};
    // res.status(200).render('index.pug',params) --> here we serve home.pug not index.pug as we made 3 new pug files 
    res.status(200).render('home.pug',params) // Here we have to send params also
})
// to serve contact.pug as a get request
app.get('/contact', (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params) 
})

// take post request & save in server
app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in Database")
    }).catch(()=>{
        res.status(400).send("This item was not saved to the Database")
    })

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`); 
})