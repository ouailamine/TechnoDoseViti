<template>
  <div class="topnav">
    <div class ="row">

      
      <router-link to="/" class=" col-md-4 nav-link" style= "outline-style:solid; outline-color:white; outline-width:1px" >
            <b> <p class="text-center"> Accueil </p></b>
      </router-link>
      
      <router-link to="/InterParcel" class=" col-md-4 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Structure du végétal </b> 
        <br>
        <b> Variabilité inter-parcellaire et temporelle </b> 
      </router-link>

      <!-- <div class = "col-md-6" style= "outline-style:solid;" >
        <div class="row nav-link text-white" style="text-align:center;">
          <b> Structure du végétal </b>
        </div>
        <div class = "row">
          <router-link to="/IntraParcel" class="col-md-6 nav-link" style= "outline-style:solid; outline-width:1px" > 
            <b> Variabilité intra-parcellaire et temporelle </b> 
          </router-link>
          <router-link to="/InterParcel" class=" col-md-6 nav-link" style= "outline-style:solid; outline-width:1px" > 
            <b> Variabilité inter-parcellaire et temporelle </b> 
          </router-link>
        </div>
      </div> -->

      
      <router-link to="/ScenTechno" class=" col-md-4 nav-link" style= "outline-style:solid; outline-color:white; outline-width:1px" > 
        <b> Comparaison des scénarios technologiques </b> 
        <br>
        <b> de pulvérisation </b> 
      </router-link>
      
      
    </div>

   
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  
  async created () {



 },
  methods: {

    
  },
};
</script>

<style scoped>
 @media screen and (min-width: 900px) {
.topnav {overflow: hidden;background-color: #333; width: 100%;}
.topnav a {float: left;display: block;color: #f2f2f2;text-align: center;padding: 14px 16px;text-decoration: none;}
#exit{float: right}
.topnav a:hover {background-color:rgb(165, 161, 161);color: black;}}

@media screen and (max-width: 900px) {
.topnav a {float: none;width: 35%;}
.topnav {overflow: hidden;background-color: #333; width: 100%;}
.topnav a {float: left;display: block;color: #f2f2f2;text-align: center;padding: 5px 5px;text-decoration: none;}

.topnav a:hover {background-color:rgb(165, 161, 161);color: black;}}





</style>
