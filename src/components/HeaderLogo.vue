<template>
    <div class="headerlogo">
        <div class="container">
            <div class="row align-items-center">
                <img class="logo" src="../assets/pill.png" alt="" width="17%" height="17%" >
                <p class="font-weight-normal align-center h-100 m-0" style="padding-left: 2%">Health Monitoring</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderLogo',
        data() {
            return{};
        }
    }
</script>

<style>
    .logo{
        max-width: 72px;
        max-height: 72px;
    }
    @media screen and (min-width: 700px){
        .font-weight-normal{
            font-size: 20px;
        }
    }
    @media screen and (max-width: 700px){
        .font-weight-normal{
            font-size:3.2vw;
        }
    }


</style>