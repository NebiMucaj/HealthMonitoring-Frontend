Prescription =class Prescription{
    constructor(patientID,doctorID,drugID,startDate,endDate,specificDays,frequenzID,amount){

        this.patientID=patientID;
        this.doctorID=doctorID;
        this.drugID=drugID;
        this.startDate=startDate;
        this.endDate=endDate;
        this.specificDays=specificDays;
        this.frequenzID=frequenzID;
        this.amount=amount;
    }
    insertPrescription(){
        if(this.endDate.length==0)this.endDate=null
        else this.endDate= '"'+this.endDate+'"'
        let sql= 'insert into prescription(patientID,doctorID,drugID,startDate,endDate,specificDays,frequenzID) Values ('+this.patientID+','+this.doctorID+','+this.drugID+",'"+this.startDate+"',"+this.endDate+",'"+this.specificDays+"',"+this.frequenzID+');'
        console.log(sql)
        return sql;


    }






}

getallPrescriptionByID=function(patientID){



    var sql ='select * from prescription p inner join frequenz f on f.frequenzID=p.frequenzID inner join drug d on d.drugID=p.drugID inner join amount a on a.prescriptionID=p.prescriptionID and patientID='+patientID+';'
    return sql


}
deletePrescriptionByID=function(prescriptionID){

    var sql= 'DELETE FROM amount where prescriptionID='+prescriptionID+';'+'DELETE FROM prescription where prescriptionID ='+prescriptionID+';'
    return(sql)
}


module.exports=getallPrescriptionByID;
module.exports=deletePrescriptionByID;
module.exports=Prescription;


