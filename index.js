const express = require('express');
const app= express();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    // Pass to next layer of middleware
    next();
});

const bodyparser = require('body-parser')
require('dotenv/config')
const intakeRoute=require('./routes/Intake')
const vitalsRoute=require('./routes/Vitals')
const messageRoute=require('./routes/Message')
const prescriptionRoute=require('./routes/Prescription')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions={
swaggerDefinition:{
   info:{ title:'HealthMonitoring API',
    description:'API for monitoring of drug adherence and vital parameters of patients at home',
    contact:{
    name:'Andrea Karadzhova,Danylo Ulianov,Nebi Mucaj, '

    },
    servers:['http://localhost:5000'],
   }
},
apis:['./routes/*.js']

}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var cors = require('cors')
app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyparser.json())
app.use('/intake',intakeRoute);
app.use('/history', vitalsRoute)
app.use('/message', messageRoute)
app.use('/prescription',prescriptionRoute)

app.listen(5000);
console.log('server is listining on port 5000')