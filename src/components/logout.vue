<template>
  <nav class="navbar sticky-top navbar-dark bg-primary">
  <a><i class="fas fa-user-md fa-2x " style="color:white"></i> <h6 style="color:white;">{{doctorName}}</h6></a>
  <a><HeaderLogo/></a>
 <a title="Logout" v-on:click="logUserOut" ><i class="fas fa-sign-out-alt fa-2x" style="color:white"></i> </a>
</nav>
            
       
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import HeaderLogo from "../components/HeaderLogo";

export default {
  components:{
      HeaderLogo
  },
  created: function(){
    this.getUserDetails();
   this.doctorID=this.user.doctorID.toString()
       fetch('http://localhost:5000/patient/doctor/'+this.doctorID,{
                            headers:{
                 Authorization:'Bearer '+localStorage.getItem("jwt")
                            }
           })
            .then(response=>response.json())
            .then(data=>{ this.doctorName=data.fullname
            console.log(this.doctorName)
            })
  },
  data() {
    return {
      doctorName: '',
      doctorID:'',
      user:null
    };
  },
  methods: {

    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
     getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    }
  }
  
};
</script>
<style scoped></style>