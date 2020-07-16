const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

//Setting up Path
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting up PORT
const port = process.env.PORT || 3000;

//Setting handlebars and views location
app.set('view engine', 'hbs'); //using hbs we can render html files dynamically under views folder.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//app.use is used for setting middleware files, that is when we refer css, js, or any other file, here default path public is given
app.use(express.static(path.join(__dirname, '../public'))); //using public directory to access all it's files and it is the method of static rendering.

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Index Page',
        name: 'Karthik Durai'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Karthik Durai'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Contact me for any queries...',
        title: 'Help Page',
        name: 'Karthik Durai'
    })
})

app.get('/weather', (req, res)=>{
    
    console.log(req.query);
    if(!req.query.address){
       return res.send({
           error: 'Please Provide an address'
       })
    }
    geoCode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
     
        //calling forecast function
        forecast(data.latitude, data.longitude, (error, forecastData)=>{
           if(error){
              return res.send({
                  error: error
              })
           }
       
           //console.log(data.location);
           //console.log(forecastData);
           res.send({
            address: req.query.address,
            location: data.location,
            forecastData: forecastData
        });
       })
       
   })
   
  
})

app.get('/help/*', (req, res)=>{
    res.render("404Page", {
        title: '404 Page Error!!!',
        errorMessage: 'No Help Artcile exists'
    })
})

//404 page route
app.get('*', (req, res)=>{
   res.render("404Page", {
       title: '404 page Error!!!',
       errorMessage: '404 Error - Page Not Found!!!'
     
   })
})

app.listen(port, ()=>{
    console.log("Server started successfully at port "+ port);
})