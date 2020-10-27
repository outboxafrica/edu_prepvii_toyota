const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;

//Connect to the db
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
 ()=> console.log('connected to db')
 );

//Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', " Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
})


const registerroutes = require('./routes/register');
app.use('/register',registerroutes);

const loginrroutes = require('./routes/login');
app.use('/login',loginrroutes);

const homeroutes = require('./routes/home');
app.use('/home',homeroutes);

const questionroutes = require('./routes/question');
app.use('/question',questionroutes);

const questionidroutes = require('./routes/question');
app.use('/:questionid',questionidroutes);

const answerroutes = require('./routes/answer');
app.use('/answer',answerroutes);

const answeridroutes = require('./routes/answer');
app.use('/:answerid',answeridroutes);

app.listen(port,()=>{
    console.log(`Server running`)
});