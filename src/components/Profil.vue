<template>
  <div class="card card bg-light border-primary  " >
  <div class="card-header  bg-primary text-white "><h2 class="d-inline"> <i class="far fa-id-card"></i>  {{patient.name}} {{patient.lastName}}</h2>
  
  </div>
  <div class="card-body ">
  <div class="row" v-show="show">
      <div class="col-3" >
        <img src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png" class="border border-primary rounded-circle w-50">
        
      </div>   
    <div class="card col-6 h-75">
      <div class="card-body">
        <ul>
       <li><h4> <b>Alter:</b> {{patient.age}} </h4> </li>
       <li><h4> <b>Größe:</b> {{patient.height}} cm </h4> </li>
       <li><h4> <b>Gewicht:</b> {{patient.weight}} kg </h4> </li>
       <li><h4> <b>Versicherung:</b> Techniker Krankenkasse </h4> </li>
       <li><h4> <b>Telefon:</b> {{patient.phoneNumber}} </h4> </li>
       <li><h4> <b>E-mail:</b> {{patient.email}} </h4> </li>
        </ul>
        </div>
    </div>
         <div class="col-3 align-self-end">
             
             <button @click='show = !show' type="button" class="btn btn-outline-primary btn-lg btn-block m-2"><i class="far fa-comments fa-2x"></i></button>
          
            <transition name='fadein'>
           
            </transition>
       
    </div>

  </div>
  <div class="row" v-show="!show">
      

         <div class="col-12 align-self-end">
             
             <button @click='show = !show' type="button" class="btn btn-outline-primary btn-lg btn-block m-2">Zurück</button>
            <transition name='fadein'>
            <Chat @clicked='show = !show' v-bind:doctorID='doctorID.toString()' v-bind:patientID="id" isDoctor='true' v-bind:patientName='patient.name+" "+ patient.lastName' v-bind:doctorName="doctorName"></Chat>
            </transition>
       
    </div>
   
  </div>
  </div>
  <div>
   

  </div>

  </div>
  

</template>

<script>

import Chat from'../components/Chatbox'
export default {
   props:{
    
 id: { type: String,required: true	},
 doctorID:{
   type:Number,
   required:true
 }
  },
  components: {
     
    Chat
  },
  created: function(){
    
    fetch('http://localhost:5000/patient/user/'+this.id,
    {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    })
    .then(response => response.json())
   .then(data =>{
   this.patient=Object.values(data)[0][0];
   })
  fetch('http://localhost:5000/patient/doctor/'+this.doctorID.toString(),{
                            headers:{
                 Authorization:'Bearer '+localStorage.getItem("jwt")
                            }
           })
            .then(response=>response.json())
            .then(data=>{ this.doctorName=data.fullname
            console.log(this.doctorName)
            })
  },
 
  data: ()=>{
    
      return {
         show: true,
         patient:null,
         doctorName:null
      }
  }
}
</script>

<style>

ul{
    list-style-type:none
}
</style>
