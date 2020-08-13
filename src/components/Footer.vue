<template>
    <div id="footer">
        <footer class="page-footer font-small unique-color-dark mt-5">
            <!-- Footer Links -->
            <div class="container text-center text-md-left mt-5">
                <!-- Grid row -->
                <div class="row align-items-center justify-content-center">
                    <!-- Grid column -->
                    <div class="col">
                        <!-- Links -->
                        <h6 class="text-uppercase text-center font-weight-bold">Emergency Contacts</h6>
                        <br>
                        <p class="text-center">
                            <i class="fa fa-phone mr-3"></i><b>Non-emergency medical (doctor on call):</b> 116 117</p>
                        <p class="text-center">
                            <i class="fa fa-phone mr-3"></i><b>Nurse advice line:</b> 00800 4759 2330</p>
                        <p class="text-center">
                            <i class="fa fa-phone mr-3"></i><b>Toxic substance emergency:</b> 192 40</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
            <!-- Footer Links -->
        </footer>
        <!-- Footer -->
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style>
    #footer{
        bottom:0;
    }
    @media screen and (min-width: 700px){
        .page-footer{
            font-size: 12px;
        }
    }
    @media screen and (max-width: 700px){
        .page-footer{
            font-size:1.8vw;
        }
    }
    @media screen and (max-width: 540px) {
        .page-footer {
            font-size: 11px;
        }
    }
</style>