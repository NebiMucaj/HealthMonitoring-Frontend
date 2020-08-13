Intake =class Intake{
    constructor(patientId, drugId, T, amount){
        this.patientId = patientId;
        this.drugId = drugId;
        this.T = T;
        this.amount = amount;
    }

    insertIntake() {
        var sql = "insert into intake(patientId, drugId, T, amount) values (" + this.patientId + "," + this.drugId + ",'" + this.T + "','" + this.amount + "')";
        return sql;
    }

}





getSearchQueryI= function(queryobj){

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
    var sql = 'SELECT * FROM intake i, drug d WHERE i.drugId = d.drugId and '+condition
    console.log(sql)
    return sql

}

deleteIntake=function(intakeId){

    var sql = 'DELETE FROM intake WHERE intakeID=' + intakeId;
    return sql;

}
getTwentyi=function(){

    var sql = 'select * from intake as i, drug as d where d.drugId = i.drugId order by i.T desc limit 20'
    return sql

}


updateIntake=function(intakeId, patientId, drugId, T, amount){
    var sql = "update intake set patientId=" + patientId + ", drugId=" + drugId + ",T='" + T + "',amount='" + amount + "' where intakeId=" + intakeId;
    return sql;

}


module.exports=deleteIntake;
module.exports=getSearchQueryI;
module.exports=getTwentyi
module.exports=updateIntake;

module.exports=Intake;
