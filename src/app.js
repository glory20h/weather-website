const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leeset'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Leeset'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help?',
        name: 'Yangyang'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) return res.send({
            error: err
        });
    
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) return res.send({
                error: err
            });

            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!res.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Leeset',
        errorMessage: 'Help article not found! :O'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Leeset',
        errorMessage: 'WOOOOOOOW,! 404 PAGE NOT FOUND! :O'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})