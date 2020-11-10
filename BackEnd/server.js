//imports
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//dbconnect
mongoose.connect(process.env.DB_Connection, 
{useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open',()=>console.log('Connected to DB server'))

//Application-JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS

app.use(cors());

/*---------------------------------------Routes--------------------------------------------------------*/

//Default
app.get('/', (req,res)=>{
    res.send('Listening');
})

//Employees Route
const employeeRouter = require('./routes/employees.js');
app.use('/employees',employeeRouter);

//Users Route
const userRouter = require('./routes/users.js');
app.use('/users',userRouter)



//listen

port = process.env.port || 3000
app.listen(port, ()=> console.log('Server Started'))
console.log('Listening on localhost:', port);