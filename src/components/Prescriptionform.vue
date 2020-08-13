<template>
 <div class="prescriptionplan">
    <form class="m-4 border border-primary p-2 rounded" >
        <div class="row m-2">
        
        <h3 class="col">Rezept</h3>
        <button  v-if="editMode==true" v-on:click="deletPrescription" type="button" class="btn btn-outline-primary col-3 float-right"><i class="far fa-trash-alt"></i></button>
        
        
    </div>
        <div class="row m-2">
          <div class="col-11">
          <model-select :options="options"
                                v-model="item"
                                placeholder="select item">
         </model-select>
          </div>
          <div  class="col-1">
          
           <button v-if="selected" v-on:click="alertDrug" type="button" class="btn btn-primary mb-2  float-right"><i  class="far fa-question-circle fa-1x"></i></button>
          </div>
          
          
                
        </div>
        <div class="row m-2">
        <div class="input-group  col-10">
  <div class="input-group-prepend">
   <select v-model="intakeTime" class="form-control" id="exampleFormControlSelect1">
                    <option value="0">Morgens</option>
                    <option value="1">Vormittag</option>
                    <option value="2">Mittag</option>
                    <option value="3">Nachmittag</option>
                    <option value="4">Abends</option>
                    <option value="5">Nachts</option>
                
                  </select>
    
  </div>
  <input type="text" class="form-control" v-model="amount" placeholder="Dosis">
</div>  
         <button v-on:click="addAmount" type="button" class="btn btn-outline-primary col-2"><i class="fas fa-plus"></i></button>      
        </div>
        <div class="row m-4">
           <table v-if="amountList.length>0" class="table table-sm table-hover">
        <thead>
            <tr>
              <th scope="col">Tageszeit</th>
              <th scope="col">Dosis</th>
             
            </tr>
          </thead>
<tbody >
    <tr v-for="(item, index) in amountList" :key="index">
      
      
      <th v-if="item.intakeTimeindex==0" scope="row">Morgens</th>
      <th v-if="item.intakeTimeindex==1" scope="row">Vormittag</th>
      <th v-if="item.intakeTimeindex==2" scope="row">Mittag</th>
      <th v-if="item.intakeTimeindex==3" scope="row">Nachmittag</th>
      <th v-if="item.intakeTimeindex==4" scope="row">Abends</th>
      <th v-if="item.intakeTimeindex==5" scope="row">Nachts</th>
      <td>{{item.amount}}  <button v-on:click="deleteAmount(index)" type="button" class="btn btn-outline-primary col-3 float-right"><i class="far fa-trash-alt"></i></button>      </td>
      
        
      
      </tr>
  </tbody>
</table>
        </div>
        <div class="row m-2">
          <div class="col">
           <h6><label for="comment">Beschreibung/Anmerkung:</label></h6>  
        </div>
        </div>
         
        <div class="row m-2 justify-content-between">
          <div class="col-6">
          <button v-on:click="description+='\n Die Medikamente sind vor dem Essen einzunehmen '" type="button" class="btn btn-primary  btn-block">Vor dem Esssen</button>
          </div>
          <div clas="col-6">
          <button  v-on:click="description+='\n Die Medikamente sind nach dem Essen einzunehmen. '" type="button" class="btn btn-primary  btn-block">Nach dem Essen</button>
          </div>
          
         
        </div>
        <div class="row m-2">
          <div class="col">
            <div class="form-group">
              
            <textarea v-model="description" class="form-control"  rows="4" placeholder="Anmerkung..."> </textarea>
            </div>  
        </div>
        </div>
        <div class="row m-2">
            <h6 class="col">Wiederholung:</h6>
        </div>
         <div class="row m-2">
          <div class="col">
          <model-select :options="frequenzList"
                                v-model="frequenzID"
                                placeholder="Wählen sie ein Wiederholungsinterval">
         </model-select>
          </div>
         
          
          
                
        </div>
        <div class="row m-2">
            <div class="form-group col-6">
               <h6> <label for="comment">Start</label></h6>
            <input v-model="start" class="form-control" type="date">
            </div> 
            <div v-show="frequenzID>0" class="form-group col-6">
              <h6> <label for="comment">Ende(Optional)</label></h6>
            <input v-model="end" class="form-control" type="date">
            </div> 
            

      

        </div>
        
        
        
        
       
        <div v-show="frequenzID==2" >
        <div class="row m-2">
            <div class="col-10">
                <select v-model="specificDay" class="form-control" id="exampleFormControlSelect1">
                    <option value="1">Montag</option>
                    <option value="2">Dienstag</option>
                    <option value="3">Mittwoch</option>
                    <option value="4">Donnerstag</option>
                    <option value="5">Freitag</option>
                    <option value="6">Samstag</option>
                    <option value="0">Sonntag</option>
                  </select>
    
              </div>
          <div class="col-2">
            
            
          <button v-on:click="addDay" type="button" class="btn btn-outline-primary"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="row m-4 ">

              <div class="border border-primary rounded dayList">
                <div class="col">specific Days:</div>
              <span v-on:click="deleteItem(index)" v-for="(item, index) in specificDaysList" :key="index" class="badge  badge-primary  m-1"><h6>{{item}}</h6> <i class="fas fa-minus-circle fa-lg"></i> </span>
            
              </div>
            </div>
        </div>
        
          <div class="row">
          <div class="col">
            
          <button v-if="editMode==false" v-on:click="alert" type="button" class="btn btn-primary mb-2  float-right">Rezept erstellen</button>
          <button v-else v-on:click="alert" type="button" class="btn btn-primary mb-2  float-right">Rezept aktualisieren</button>
          
          
          </div>
         
        </div>
      </form>
     
      
    
    
    
  


    </div>
</template>

<script>
import 'vue-search-select/dist/VueSearchSelect.css'
import { ModelSelect } from 'vue-search-select'

export default {
   
   props:{
        data:Object,
        patientID:String,
        editMode:Boolean,
        doctorID:Number
        
    },
    components: {
      ModelSelect
    },
    created:function(){
    this.getDrugList();
    this.getFrequenzList();
    this.start=this.data.start.toISOString().substring(0,10) 
    this.end= this.data.end.toISOString().substring(0,10)
    this.description=this.data.extendedProps.description
    this.amountList=this.data.amountList
    this.frequenzID=this.data.extendedProps.frequenzID
    
      
    },

    

    data:()=>{
        return {
      start:'',
      end:'',
      options: [],
      drugList:null,
        item: {
          value: '',
          text: ''
        },

      selected:false,
      intake:'',
      annotation:'',
      specificDays:[],
      specificDaysList:[],
      dayList:'',
      amount:'',
      description:'',
      frequenzList:[],
      frequenzID:'',
      specificDay:'',
      amountList:[],
      intakeTime:''
      
        }
    },
     watch: {
    data: function (val) {
       this.start=this.getLocalDate(val.extendedProps.start)
     if(Object.prototype.hasOwnProperty.call(val.extendedProps,'end')==false) this.end='';
    else  this.end=this.getLocalDate(val.extendedProps.end);
    this.item.text=val.title
    this.item.value=val.extendedProps.drugID
    this.description=val.extendedProps.description;
    this.amountList=val.amountList;
    this.frequenzID=val.extendedProps.frequenzID.toString();
    
   
    
    
    },
    item:function(){
      this.selected=true
    },
    specificDays: function(val){
     var list =[];
     val.map(x=>{
       switch(x){
         case "1": list.push('Monntag'); break;
         case "2": list.push('Dienstag'); break;
         case "3": list.push('Mittwoch'); break;
         case "4": list.push('Donnerstag'); break;
         case "5": list.push('Freitag'); break;
         case "6": list.push('Samstag'); break;
         case "0": list.push('Sontag'); break;
         default: break;

       }

     this.specificDaysList=(list)
     
     })
    }
    
    
  }, 
  methods:{
    deletPrescription:function(){
      fetch('http://localhost:5000/prescription/delete/'+this.data.extendedProps.prescriptionID, {
            method: 'DELETE',
            headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    
        

})
this.setInitialForm()

this.$emit('reload')

    },

    getLocalDate :(valStr)=> {
      console.log(valStr)
      let val =new Date(valStr)
      console.log(val)
      return (new Date(val.getTime() - (val.getTimezoneOffset() * 60000)).toISOString().substring(0,10));
    },
    alert: function(){
            if(this.editMode==false)this.postPrescription();
            else this.updatePrescription()
            this.$emit('clicked')
        
    },

    alertDrug:function(){
      this.$emit('getDrug',this.item.value)
    },
    getDrugList:function(){
    
   fetch('http://localhost:5000/drug',
   {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    })
  .then(response => response.json())
  .then(data =>{
   var dataList = Object.values(data)[0];
    dataList.map(x=> this.options.push({ value: x.drugID.toString(), text: x.drugName}))
  
  
  
  });

    
    

    },
    setInitialForm:function(){
this.start= new Date();
this.end=''
this.intake='',
this.annotation='',
this.specificDays=[],
this.specificDaysList=[],
this.dayList='',
this.amount='',
this.description='',
this.frequenzID='',
this.specificDay='',
this.amountList=[],
this.intakeTime=''
 
    },
    updatePrescription:function(){
      if(this.specificDays.length!==0){
this.specificDays.map(x=> {
   this.dayList+=x+','
 })
}
 this.dayList = this.dayList.substring(0, this.dayList.length - 1);
 


 
           fetch('http://localhost:5000/prescription/'+this.data.extendedProps.prescriptionID, {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization:'Bearer '+localStorage.getItem("jwt")
    
            },
            body: JSON.stringify({patientID:parseInt(this.patientID),doctorID:this.doctorID,drugID:parseInt(this.item.value),startDate:this.start,endDate:this.end,specificDays:this.dayList,frequenzID:parseInt(this.frequenzID),amountList:this.amountList,description:this.description})

})

this.setInitialForm()



    },

postPrescription: function(){

if(this.specificDays.length!==0){
this.specificDays.map(x=> {
   this.dayList+=x+','
 })
}
 this.dayList = this.dayList.substring(0, this.dayList.length - 1);
 


 
           fetch('http://localhost:5000/prescription/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization:'Bearer '+localStorage.getItem("jwt")
            },
            body: JSON.stringify({patientID:parseInt(this.patientID),doctorID:this.doctorID,drugID:parseInt(this.item.value),startDate:this.start,endDate:this.end,specificDays:this.dayList,frequenzID:parseInt(this.frequenzID),amountList:this.amountList,description:this.description})

})

this.setInitialForm()


    
    },
    getFrequenzList : function(){
      fetch('http://localhost:5000/prescription/frequenz',
      {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    }
      )
  .then(response => response.json())
  .then(data =>{
    var dataList = data;
    dataList.map(x=> this.frequenzList.push({ value: x.frequenzID.toString(), text: x.frequenz}))
   

    })
  },
  addDay:function(){
    this.specificDays.push(this.specificDay)
  },
  deleteItem: function(index){
     this.specificDaysList.splice(index,1)
     this.specificDays.splice(index,1)
  },
  addAmount: function(){
    this.amountList.push({intakeTimeindex:parseInt(this.intakeTime),amount:parseInt(this.amount)})
  },
  deleteAmount(index){
    this.amountList.splice(index,1)
  }
  }
  
}
</script>

<style>


form{
    background-color: white;
}
.dayList{
  height: 150px;
  width: 100%;
  
}
.deleteIcon{
  float:left;
}

</style>
