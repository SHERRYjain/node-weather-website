const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

const forecast = require('../src/utils/forecast')
const geoCode = require('../src/utils/geocode')

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();

app.set('view engine', 'hbs')
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shreyans Jain',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shreyans Jain',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text.',
        title: 'Help',
        name: 'Shreyans Jain'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide an address',
        })
    }
    

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error,
            });
        }
    
        forecast(latitude, longitude, (error, forcastdata) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }

            res.send({
                location: location,
                forcastdata: forcastdata,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'provide a search term',
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Shreyans Jain'
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Shreyans Jain'
    });
})

app.listen(port, () => {
    console.log('The server is up on port' + port);
});