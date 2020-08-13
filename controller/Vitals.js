Vitals =class Vitals{
    constructor(vitalsId, patientId,  bloodPressure1, bloodPressure2, pulse, temp, weight, T){
        this.vitalsId= vitalsId;
        this.patientId = patientId;
        this.bloodPressure1 = bloodPressure1;
        this.bloodPressure2 = bloodPressure2;
        this.pulse = pulse;
        this.temp = temp;
        this.weight = weight;
        this.T = T;
    }

    insertVitals() {
        var sql = "INSERT INTO vitalparameters(patientId, bloodpressure1, bloodpressure2, pulse, temperature, weight, T) VALUES (" + this.patientId + "," + this.bloodPressure1 + "," + this.bloodPressure2 + "," + this.pulse + "," + this.temp + "," + this.weight + ",'" + this.T + "');";
        //Make an array of values:
        return sql;

    }

}

getVitalsByID= function(vitalsId){


    var sql = 'SELECT * FROM vitalparameters WHERE vitalsID='+vitalsId;
    return sql

}



getSearchQuery= function(queryobj){

    var querylist = Object.keys(queryobj).map(function(key) {
        return [key, queryobj[key]];
    });
    var condition=''
    var index=0;
    querylist.map(x=> {

        if (index<querylist.length-1)condition+=((x[0]+'='+"'"+x[1]+"'"+' and '));
        else condition+=((x[0]+"="+"'"+x[1]+"'"));


        index++


    })
    var sql = 'SELECT * FROM vitalparameters WHERE '+condition
    console.log(sql)
    return sql

}

deleteVitals=function(vitalsId){

    var sql = 'DELETE FROM vitalparameters WHERE vitalsID=' + vitalsId;
    return sql;

}

getTwenty=function(){

    var sql = 'select * from vitalparameters order by T desc limit 20'
    return sql

}

updateVitals=function(vitalsId, patientId, bloodPressure1, bloodPressure2, pulse, weight, temp, T){
    var sql = "update vitalparameters set patientId=" + patientId + ", bloodPressure1=" + bloodPressure1 + ",T='" + T + "',bloodPressure2=" + bloodPressure2 + ", pulse=" + pulse + ", weight=" + weight + ", temperature=" +  temp + " where vitalsId=" + vitalsId;
    return sql;

}



// module.exports=getVitalsByID;
module.exports=getSearchQuery;
module.exports=deleteVitals;
module.exports=getTwenty;
module.exports=updateVitals;

module.exports=Vitals;