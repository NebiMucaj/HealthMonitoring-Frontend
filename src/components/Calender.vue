<template>
 <div class="calender" >
  
   
    <FullCalendar
      class='demo-app-calendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      timeZone="Europe/Germany"
      :height="800"
      :slotLabelFormat="{ 'hour12': false, 'hour': '2-digit', 'minute': '2-digit'}"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :hiddenDays=[]
      :events="calendarEvents"
      @eventClick="showEvent"
      @dateClick="handleDateClick"
      />
      <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Modal Heading</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          Modal body..
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
   
  </div>
    

  </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props:{
        patientID:String,
        updated:Number
        
  },
  created(){
  
  this.getprescription()
  
  },
 
  data: function() {
    return {
      updatedVal:false,
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [  ]
    }
  },
   watch: {
     updated: function(){
     setTimeout(function () { this.getprescription() }.bind(this), 1500)
     

     }

   },
  methods: {
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    },
    getAmount(prescriptionID, frequenzID){
    if(frequenzID<3){
    let eventListByID = this.calendarEvents.filter(x=>x.extendedProps.prescriptionID==prescriptionID)
    let amountList=[];
    eventListByID.map(x=>amountList.push({intakeTimeindex:x.extendedProps.intakeTimeIndex,amount:x.extendedProps.amount}))
      return  amountList
    
    }
    else{
         let eventListByID = this.calendarEvents.filter(x=>x.extendedProps.prescriptionID==prescriptionID)
         let amountList=[];
         eventListByID.map(x=>amountList.push({intakeTimeindex:x.extendedProps.intakeTimeIndex,amount:x.extendedProps.amount}))
    amountList=  Array.from(new Set(amountList.map(JSON.stringify))).map(JSON.parse);
      
      return  amountList
    }
    },

    showEvent(arg) {
      let amountList=this.getAmount(arg.event.extendedProps.prescriptionID,arg.event.extendedProps.frequenzID)
      
      this.addingMode = false;
      arg.event.amountList=amountList;
      
      this.$emit('getData', arg.event)

      
    },
    getprescription(){
    fetch('http://localhost:5000/prescription/prescriptions/'+this.patientID,
    {
       headers:{
         Authorization:'Bearer '+localStorage.getItem("jwt")
       }
    })
    .then(response => response.json())
    .then(data =>{
    this.calendarEvents = Object.values(data)[0];
   
    
  
    })
    

  }
}
}

</script>

<style lang='scss'>

// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
 
.demo-app-calendar{
    color:black;
    background-color: white;
 
}
.calender{
background-color:#87CEFA ;
  
}


</style>
