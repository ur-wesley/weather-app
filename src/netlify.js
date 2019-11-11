const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Wesley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Wesley'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'need help?',
        author: 'Wesley'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please provide a location!'
        })
    }

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forcecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.location,
                latitide: latitude,
                longitude: longitude,
                location: location,
                forecast: forcecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Dieser Artikel existiert nicht.',
        author: 'Wesley'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Seite konnte nicht gefunden werden',
        author: 'Wesley'
    })
})

app.listen(1337, () => {
    console.log('Server is up on port ' + 1337 + '.')
})