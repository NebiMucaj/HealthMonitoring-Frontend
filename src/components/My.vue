<template>


    


<div id="chat">
    
    <div class="conatiner border">
    <div class="row">
    <div class="col-3 padding-0">
    <table class="table table-hover table-fixed">
  <thead class="thead-light">
    <tr class="table-primary">
      
      <th scope="col">Doctors</th>
 
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in participants" v-bind:key="index" class="table-primary">
      
      <td v-on:click="setCurrentDoctor(index)"><h4>{{item.fullName}}</h4> <span class="badge badge-pill badge-primary float-right">{{item.specialization}}</span></td>
  
    </tr>
   
  </tbody>
</table>
 </div>
    <div class="col-9 padding-0">
         <Chat v-bind:doctorID="currentDoctor.doctorID" patientID='3' isDoctor='false' patientName='Max Mustermann' v-bind:doctorName="currentDoctor.fullName"></Chat>

    </div>
    </div>
        
        
    </div>
    
    </div>


</template>

<script>
 import Chat from '/home/nebi/webtech/Health Monitoring/Health-Monitoring_frontend/frontend/healthmonitoring/src/components/Chatbox.vue'

export default {
 
  components: {
      Chat
  
  },
  props:{
    
  },
  data: ()=>{
      return {
          patientID:1,
          doctorID:1,
          participants:[{doctorID:1,fullName:'Dr.Müller',specialization:'dentist'},
                        {doctorID:2,fullName:'Dr.Guthenke ',specialization:'family doctor'},
                        {doctorID:3,fullName:'Dr.med Yildirim',specialization:'emergency doctor'}      
                         ],

           currentDoctor:{fullName:"Dr. Müller"}             
         
      }
  },
  methods:{
     setCurrentDoctor: function(index){
         this.currentDoctor=this.participants[index]
     }
  },
  
  
}
</script>

<style>
body{
    background-color: whitesmoke;
}
.padding-0{
    padding-right:0;
    padding-left:0;
}

.table-fixed tbody {
  height:475px;
  overflow-y: scroll;
  width: 100%;
}
.table-fixed thead, .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th {
  display: block;
}



</style>
