require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

// data imports
const Product = require('./models/Product')
const ProductStat = require('./models/ProductStat')
const Transaction = require('./models/Transaction')
const OverallStat = require('./models/OverallStat')
const AffiliateStat = require('./models/AffiliateStat')
const {dataAffiliateStat} = require('./data/usersData')


const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())


//routes
const clientRoutes = require('./routes/client')
const managementRoutes =  require('./routes/management')
const generalRoutes = require('./routes/general')
const salesRoutes = require('./routes/sales')
const ProductsStat = require('./models/ProductStat')

//middlewares
app.use('/client', clientRoutes)
app.use('/general', generalRoutes) // users and dashboard
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)



const port = 5050
const url = process.env.MONGO_URI

const start = async()  => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to db');

        app.listen(port, () => {
            console.log('listening on port 5050');
        })
        // AffiliateStat.insertMany(dataAffiliateStat)
        console.log('done');
    } catch (error) {
        console.log(error);
    }
}

start()
