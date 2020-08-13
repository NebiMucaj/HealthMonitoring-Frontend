const express= require('express');
const router= express.Router();
const drug=require('../controller/Intake.js')
const con=require('../models/dbconnection.js')

/**
 * @swagger
 *
 * paths:
 *  /intake/searchi:
 *   get:
 *      tags:
 *         - Intake
 *      description: search for  a intake By drug name or intakeid
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: No Patient found
 *       '500':
 *         description: Error in Database
 *      parameters:
 *       - in: query
 *         name: IntakeId
 *         schema:
 *          type: String
 *          default: ''
 *          required: true
 *         description:  intake id
 *       - in: query
 *         name: Date
 *         schema:
 *          type: String
 *          default: ''
 *          required: true
 *         description: date of intake
 *       - in: query
 *         name: drugName
 *         schema:
 *          type: String
 *          default: ''
 *          required: true
 *         description: drug name
 *
 *
 *
 */

router.get('/searchi',(req,res)=>{

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
        let query=getSearchQueryI(queryobj)

        con.connection.query(query, function(err, result) {

            if (err) res.status(500).json({'error':err});

            else {
                if (result.length==0) res.status(400).json({'intakearr':result})

                else res.status(200).json({'intakearr':result});
            }
        });

    }
});

/**
 * @swagger
 *
 * paths:
 *  /intake/savei:
 *   post:
 *      tags:
 *         - Intake
 *      description: post intake
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: requestbody is not valid
 *       '500':
 *         description: Error in Database

 *      parameters:
 *       - in: body
 *         name: intake
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             patientId:
 *               type: integer
 *             drugId:
 *               type: integer
 *             T:
 *               type: string
 *             amount:
 *               type: string
 *
 *
 *
 *
 *
 */



router.post('/savei',(req,res)=>{
    var bodyParams=Object.keys(req.body);
    var validParams=[ 'patientId', 'drugId', 'T', 'amount']
    sameParams = bodyParams.filter(x=>validParams.includes(x) );

    if(sameParams.length!= 4){res.status(400).json({'status':'Bad Request'})

    }
    else {

        var newIntake= new Intake(req.body.patientId,req.body.drugId,req.body.T,req.body.amount)

        var query=newIntake.insertIntake()

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
 *  /intake/deli:
 *   delete:
 *      tags:
 *         - Intake
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
 *         name: intakeId
 *         description: delete intake
 *
 *
 *
 *
 *
 *
 */


router.delete('/deli', (req,res)=>{

    var query = deleteIntake(req.query.intakeId);

    con.connection.query(query, function(err, result) {

        if (err) res.status(400).json({'error': err});

        else res.status(200).json({'status': 'deleted'});
    });

});

router.get('/initi', (req, res)=>{

    let query=getTwentyi()

    con.connection.query(query, function(err, result) {

        if (err) res.status(500).json({'error':err});

        else {
            if (result.length==0) res.status(400).json({'intakearr':result})

            else res.status(200).json({'intakearr':result});
        }
    });


})

/**
 * @swagger
 *
 * paths:
 *  /intake/editi:
 *   put:
 *      tags:
 *         - Intake
 *      description: edit intake
 *      responses:
 *       '200':
 *         description: Operation was successful
 *       '400':
 *         description: requestbody is not valid
 *       '500':
 *         description: Error in Database

 *      parameters:
 *       - in: query
 *         name: intakeId
 *         schema:
 *           type: String
 *           default: '2'
 *           required: true
 *         description:  ID of vitals
 *       - in: body
 *         name: intake
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *           properties:
 *             patientId:
 *               type: integer
 *             drugId:
 *               type: integer
 *             T:
 *               type: string
 *             amount:
 *               type: string
 *
 *
 *
 *
 *
 */

router.put('/editi',(req,res)=>{
    var bodyParams=Object.keys(req.body);
    var validParams=[ 'patientId', 'drugId', 'T', 'amount']
    sameParams = bodyParams.filter(x=>validParams.includes(x) );

    if(sameParams.length!= 4){res.status(400).json({'status':'Bad Request'})

    }
    else {

        let sql = updateIntake(req.query.intakeId, req.body.patientId, req.body.drugId, req.body.T, req.body.amount)
        con.connection.query(sql, function(err, result) {

            if (err) res.status(400).json({'error':err});
            else {
                res.status(200).json({'status':'updated'});

            }
        });





    }

})

module.exports=router