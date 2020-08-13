<template>
    <div id="login">
        <div class="d-flex align-middle justify-content-center text-center my-auto">
            <form action='#'  class="form-signin">
                <div class="ml-5"><HeaderLogo/></div>
                <br>
                <label for="inputEmail" class="sr-only">username</label>
                <input type="email" id="inputEmail" class="form-control" name="patientId" v-model="login.username" placeholder="username" required="" autofocus="">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" name="password" v-model="login.password" placeholder="password" required="">
                <button class="btn-block" type="button" v-on:click="loginUser">Sign in</button>
                <p class="mt-5 mb-3 text-muted">© 2020</p>
            </form>

        </div>


    </div>
</template>
<script>
 import HeaderLogo from "../components/HeaderLogo";
export default {
  components:{
     HeaderLogo
  },
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
        console.log()
      
      fetch('http://localhost:5000/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(this.login)
  })
        .then(response=>response.json())
        .then(data=>{
            let token = data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.$swal("Success", "Login Successful", "success");
          this.$router.push("/search");
        }


        })
      .catch (err=>{
        this.$swal("Error", "Something Went Wrong", "error");
        console.log(err);
      })
    }
  }
};
</script>
<style scoped>
.form-signin {
        width: 100%;
        max-width: 400px;
        padding: 15px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10%;
    }
    button{
        transition-duration: 0.4s;
        background-color: white;
        border: #008CBA 1px solid;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        color: black;
    }
    button:hover {
        background-color: #008CBA;
        color: #ffffff;
    }

</style>