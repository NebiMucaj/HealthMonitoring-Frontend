const express= require('express');
const router= express.Router();
require('../controller/Vitals')
const con=require('../models/dbconnection.js')

/**
 * @swagger
 *
 * paths:
 *  /history/search:
 *   get:
 *      tags:
 *         - Vitals
 *      description: search for  a patient By name, lastname or patientID
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: No Patient found
 *       '500':
 *         description: Error in Database
 *      parameters:
 *       - in: query
 *         name: VitalsId
 *         schema:
 *          type: String
 *          default: ''
 *          required: true
 *         description:  name of the patient
 *
 */

router.get('/search',(req,res)=>{

    console.log((req.query))
    let values = Object.values(req.query)
    let  nofilterlist =  values.filter((x)=> x.length==0)
    if( (nofilterlist.length==values.length) || values.length==0) res.status(400).json({'status':'specify your request'})
    else{
        var queryobj={};
        for(i=0;i<Object.keys(req.query).length;i++){
            var key =Object.keys(req.query)[i];
            var currentValue= req.query[key]
            console.log(currentValue)
            if(currentValue.length!=0){
                keyAsString=key.toString();
                queryobj[keyAsString]= currentValue;
            }
        }
        let query=getSearchQuery(queryobj)
        con.connection.query(query, function(err, result) {
            if (err) res.status(500).json({'error':err});
            else {
                if (result.length==0) res.status(400).json({'vitalsarr':result})
                else res.status(200).json({'vitalsarr':result});
            }
        });

    }
})


/**
 * @swagger
 *
 * paths:
 *  /history/save:
 *   post:
 *      tags:
 *         - Vitals
 *      description: post vitals
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: requestbody is not valid
 *       '500':
 *         description: Error in Database

 *      parameters:
 *       - in: body
 *         name: vitals
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             patientID:
 *               type: integer
 *             bloodPressure1:
 *               type: integer
 *             bloodPressure2:
 *               type: integer
 *             pulse:
 *               type: integer
 *             temperature:
 *               type: number
 *             weight:
 *               type: number
 *             T:
 *               type: string
 *
 *
 *
 *
 *
 */



router.post('/save',(req,res)=>{
    var bodyParams=Object.keys(req.body);
    var validParams=[ 'patientId', 'bloodPressure1', 'bloodPressure2','pulse','temperature','weight','T' ]
    sameParams = bodyParams.filter(x=>validParams.includes(x) );

    if(sameParams.length!= 7){
        res.status(400).json({'status':'Bad Request'})
    }
    else {
        var newVitals;
        newVitals = new Vitals('',req.body.patientId, req.body.bloodPressure1, req.body.bloodPressure2, req.body.pulse, req.body.temperature, req.body.weight, req.body.T);

        var query=newVitals.insertVitals()

        //post a message to the db
        con.connection.query(query, function(err, result) {

            if (err) res.status(400).json({'error':err});

            else res.status(200).json({'status':'created'});
        });

    }

})


/**
 * @swagger
 *
 * paths:
 *  /history/del:
 *   delete:
 *      tags:
 *         - Vitals
 *      description: delete vitals
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: requestbody is not valid
 *       '500':
 *         description: Error in Database

 *      parameters:
 *       - in: query
 *         name: vitalsId
 *         description: delete vitals
 *
 *
 *
 *
 *
 *
 */


router.delete('/del', (req,res)=>{

    var query = deleteVitals(req.query.vitalsId);

    con.connection.query(query, function(err, result) {

        if (err) res.status(400).json({'error': err});

        else res.status(200).json({'status': 'deleted'});
    });

});

router.get('/init', (req, res)=>{

    let query=getTwenty()

    con.connection.query(query, function(err, result) {

        if (err) res.status(500).json({'error':err});

        else {
            if (result.length==0) res.status(400).json({'vitalsarr':result})

            else res.status(200).json({'vitalsarr':result});
        }
    });


})

/**
 * @swagger
 *
 * paths:
 *  /history/edit:
 *   put:
 *      tags:
 *         - Vitals
 *      description: edit vitals
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: requestbody is not valid
 *       '500':
 *         description: Error in Database

 *      parameters:
 *       - in: query
 *         name: vitalsId
 *         schema:
 *           type: String
 *           default: '2'
 *           required: true
 *         description:  ID of vitals
 *       - in: body
 *         name: vitals
 *         description: The vitals to update for the specific patient.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             patientId:
 *               type: integer
 *             bloodPressure1:
 *               type: integer
 *             bloodPressure2:
 *               type: integer
 *             pulse:
 *               type: number
 *             temperature:
 *               type: number
 *             weight:
 *               type: number
 *             T:
 *               type: string
 *
 *
 *
 *
 *
 */

router.put('/edit',(req,res)=>{
    var bodyParams=Object.keys(req.body);
    var validParams=[ 'patientId', 'bloodPressure1', 'bloodPressure2', 'pulse', 'temperature', 'weight', 'T']
    sameParams = bodyParams.filter(x=>validParams.includes(x) );

    if(sameParams.length!= 7){res.status(400).json({'status':'Bad Request'})

    }
    else {

        let sql = updateVitals(req.query.vitalsId, req.body.patientId, req.body.bloodPressure1, req.body.bloodPressure2, req.body.pulse, req.body.weight, req.body.temperature, req.body.T)
        con.connection.query(sql, function(err, result) {

            if (err) res.status(400).json({'error':err});
            else {
                res.status(200).json({'status':'updated'});

            }
        });





    }

})



module.exports=router