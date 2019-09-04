const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Manuel Morales'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'Manuel Morales'
    })

})

app.get('/help', (req,res)=>{
    res.render('help',{
        text: 'Need any help',
        name: 'Manuel Morales',
        title: 'Help'
    })
})

app.get('/weather',(req, res)=>{
if(!req.query.address){
    res.send('ERROR: No addresss was provided.')
}else{
    geocode(req.query.address,(error,{latitud, longitud, location}={})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(longitud, latitud, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
    
          })
    })
}

})

app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404help',{
            title: 'ERROR 404',
            name: 'Manuel Morales'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'ERROR 404',
        name: 'Manuel Morales'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})