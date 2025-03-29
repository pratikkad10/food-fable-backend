const express=require('express');
const connectToDatabase = require('./config/database');
const cors = require('cors');
const authRoute = require('./routes/authRoutes');
const restaurantRoute = require('./routes/restaurantRoutes');
require('dotenv').config();


const app=express();
connectToDatabase();
app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],     
    allowedHeaders: ['Content-Type', 'Authorization', 'Token'], 
};

app.use(cors(corsOptions));
app.use('/user',authRoute);
app.use('/restaurant', restaurantRoute);


app.get('/', (req,res)=>{
    res.send("HELLO THIS IS HOME PAGE!")
})

app.listen(process.env.PORT);