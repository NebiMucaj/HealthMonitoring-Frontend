<template>
<div>
  <logout/>
<form class=" card text-white bg-primary mt-3">
    <div class="card-header"><h2>Patienten Suchen</h2></div>
  <div class="card-body row justify-content-around">
    <div class="col">
       <input v-model="name" type="text" class="form-control" id="inlineFormInputName" placeholder="Vorname">
    </div>
    <div class="col">
      <input v-model="lastName" type="text" class="form-control" placeholder="Nachname">
    </div>
    <div class="col">
      <input v-model="patientID" type="text" class="form-control" placeholder="Patienten_ID">
    </div>
    <div class="col">
        <button v-on:click="getPatient" type="button" class="btn" id="searchbtn">Suche</button>
    </div>
  </div>
</form>
<table class="table table-hover">
  <thead class="thead-light">
    <tr  class="table-primary" data-href='/patient'>
      
      <th scope="col">Vorname</th>
      <th scope="col">Nachname</th>
      <th scope="col">Patient_ID</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr v-bind:class="getColor(patient.criticalScore)" v-on:click="navigate(patient.patientID)" v-for="(patient,index) in (patients)" :key="index" >
    
      <td>{{patient.name}}</td>
      <td>{{patient.lastName}}</td>
      <td>{{patient.patientID}}</td>
      <td>{{patient.criticalScore}}</td>
      
    </tr>
    
  </tbody>
</table>

</div>

</template>

<script>


import logout from './logout'
import VueJwtDecode from "vue-jwt-decode";

export default {

  components: {
    logout
  
  },
  created: function(){
     this.getUserDetails()
    this.doctorID=this.user.doctorID.toString()
    this.getCriticalPatients()
   
  
  },

  data: ()=>{
      return {
        user:null,
        patients:[],
        name:'',
        lastName:'',
        patientID:'',
        doctorID:'',
      }
  },
  methods:{
  getPatient :function(){ 
    
    fetch('http://localhost:5000/patient/search?name='+this.name+'&lastName='+this.lastName+'&patientID='+this.patientID,
    {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    }
    )
    .then(response => response.json())
   .then(data =>{
    var patientlist=Object.values(data)[0]

   if(patientlist.length!=0)this.patients=patientlist
   else {this.patients= patientlist
    this.$swal(
  'No results!',
  'try it with other inputs',
  'error'
  )
  this.patientID=''
  this.name=''
  this.lastName=''
   }
  })
  
  },
  getCriticalPatients:function(){
     fetch('http://localhost:5000/patient/search/init/'+this.doctorID,{
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
     })
    .then(response => response.json())
   .then(data =>{
    this.patients=Object.values(data)[0]
   });
  },
  navigate: function(ID){
   this.$router.push({ name: 'patient', params: {id: ID } })
  
  },
  getColor:function(criticalScore){
    let style=''
    switch(criticalScore){
      case 0: style= 'bg-success';break;
      case 1:style='table-success';break;
      case 2:style='table-warning';break;
      case 3:style='bg-warning';break;
      case 4:style='table-danger';break;
      case 5:style='bg-danger';break;

      default: break;
    }
    return style;

  },
   getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    }
  
}
}
</script>

<style>


#searchbtn{
    background-color: white;
}

</style>
