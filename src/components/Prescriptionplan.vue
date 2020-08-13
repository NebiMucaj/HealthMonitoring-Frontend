<template>
<div >
  <logout/>
<div class="row">
  
  <div class="col-12">
  <Profil v-bind:doctorID="doctorID" v-bind:id="id" class="m-3"/>
</div>
</div>
   <div  class="prescriptionplan row ">
      <div class="col-3">
        <Prescriptionform v-on:reload="reload" v-bind:doctorID="doctorID" v-bind:editMode="editMode" v-bind:patientID="id" v-bind:data="data" v-on:clicked="alertDisplay" v-on:getDrug="getDrugInformation" />
      </div>
    <div class="col-8 border border-primary rounded p-2 mt-4">
    <Calender v-bind:updated="updated" v-bind:patientID="id"  v-on:getData="showData" class="h-50"/>
    </div>

    </div>

<div>

</div> 


</div>

</template>

<script>
import Calender from '../components/Calender'
import Prescriptionform from '../components/Prescriptionform'
import Profil from '../components/Profil'
import logout from '../components/logout'
import VueJwtDecode from "vue-jwt-decode";



export default {
  props:{
    id: { type: String,required: true	}
  },
  components: {
    Calender,
    Prescriptionform,
    Profil,
    logout
  
  },created:function(){
      this.getUserDetails()
       this.doctorID=this.user.doctorID

  },
  data: ()=>{
      return {
          data:{title:'Medikament',extendedProps: {description:"Hallo",amount:0},start: new Date(),end:''} ,
          drug:null,
          updated:0,
          editMode:false,
          doctorID:''
      }
  },
  methods:{
    reload:function(){
      this.updated++;
      this.editMode=false;
      this.$swal(
  'Good job!',
  'Rezept erfolgreich gelöscht!',
  'success'

)

    },
     getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
      showData: function(event){
      this.data=event
      this.editMode=true;
      console.log(event);
     
      
      },
      alertDisplay :function() {
        // $swal function calls SweetAlert into the application with the specified configuration.
       this.updated++;
       
       let alert = '';
       if(this.editMode==false) alert = 'Rezept erfolgreich erstellt!';
       else alert= 'Rezept erfolgreich aktualisiert!'
       this.editMode=false;
       this.$swal(
  'Good job!',
  alert,
  'success'

)
      },
      getDrugInformation:function(drugId){
          
          fetch('http://localhost:5000/drug/information/'+drugId,
          {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    })
         .then(response => response.json())
         .then(data =>{
          var drug = Object.values(data)[0][0];
          this.drug=drug
             this.$swal( {title: drug.drugName,
               icon: 'info',
               html:
      `
     <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">
    Informationen
  </a>
  <a href="#" class="list-group-item list-group-item-action">Nebenwirkungen:  `+ drug.sideEffects + `</a>
  <a href="#" class="list-group-item list-group-item-action">Form:  `+drug.dosageForm+ `</a>
  
</div>

    `
            
            
             })
  });
          
          
          
       
      }
  },
  show:function(){
    console.log(this.id)
  }
  
}
</script>

<style>

body{
  background-color:white  ;
}
</style>
