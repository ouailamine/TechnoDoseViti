<template>
    
    <div style="margin-bottom:30px;" v-if="$store.getters.getDataIsLoaded">

        <div class="row">
            <div  class="col-md-12">
                <h2>Variabilité intra-parcellaire et temporelle</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
            </div>
            
            <div class="col-md-2" id="phenoPhaseSetterView">
                <b>Stade phénologique : </b>
                <select v-model="selectedPhenoPhase" class="custom-select" style="width:auto;">
                    <option
                        v-for="(phenoPhase, index) in $store.getters.getPhenoPhases"
                        v-bind:key="index"
                        v-bind:value="phenoPhase">
                        {{ phenoPhase }}
                    </option>
                </select>
            </div>

            <div class="col-md-2">
                <div id="menudv1" class="col-md-12" style="width:auto;margin-top:10px;" >
                    <div id="btndebut">
                        <b-button id="iconedebut" variant="outline-primary" style="width:auto;" >
                        <p style="font-size:13px">Debut</p>
                        <img src="../../assets/debut.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconedebut">Debut</b-tooltip>
                    </div>
                    <div id="btnmilieu" style="display:none;">
                        <b-button id="iconemilieu"  variant="outline-primary" style="width:auto;" >
                        <p style="font-size:13px">Milieu</p>
                        <img src="../../assets/milieu.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconemilieu">Milieu</b-tooltip>
                    </div>
                    <div id="btnfin" style="display:none;">
                        <b-button id="iconefin"  variant="outline-primary" style="width:auto;">
                        <p style="font-size:13px">Fin</p>
                        <img src="../../assets/fin.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconefin">Fin</b-tooltip>
                    </div> 
                </div>
            </div>

            <div class="col-md-2" id="parcelSetter" >
                <b> Parcelle : </b>
                <select v-model="selectedParcelName" class="custom-select" style="width:auto;">
                    <option
                        v-for="(parcelName, index) in $store.getters.getParcelNames"
                        v-bind:key="index"
                        v-bind:value="parcelName">{{ parcelName }}
                    </option>
                </select>
            </div>

            

            <div class="col-md-3">
            </div>
        </div>
        <!-- <div class="row">
                <div id="menudv1" class="col-md-12" style="width:auto;margin-top:10px;" >
                    <div id="btndebut">
                        <b-button id="iconedebut" variant="outline-primary" style="width:auto;" >
                        <p style="font-size:13px">Debut</p>
                        <img src="../../assets/debut.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconedebut">Debut</b-tooltip>
                    </div>
                    <div id="btnmilieu" style="display:none;">
                        <b-button id="iconemilieu"  variant="outline-primary" style="width:auto;" >
                        <p style="font-size:13px">Milieu</p>
                        <img src="../../assets/milieu.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconemilieu">Milieu</b-tooltip>
                    </div>
                    <div id="btnfin" style="display:none;">
                        <b-button id="iconefin"  variant="outline-primary" style="width:auto;">
                        <p style="font-size:13px">Fin</p>
                        <img src="../../assets/fin.png" style="width:150px;height:auto;">
                        </b-button>
                        <b-tooltip target="iconefin">Fin</b-tooltip>
                    </div> 
                </div>
        </div> -->

        <hr>
        <div class="row" >
            <div class="col-md-2">
            </div>
            <div class="col-md-4">
                 <!-- <h3>Hauteur de végétation</h3> -->
                <IntraParcelFeature v-bind:feat="height"></IntraParcelFeature>
            </div>
            <div class="col-md-4" >
            <!-- <h3>Épaisseur de végétation</h3> -->
                <IntraParcelFeature v-bind:feat="thickness"></IntraParcelFeature>
            </div>
            <div class="col-md-2">
            </div>
        </div>

        <div class="row" >
            <div class="col-md-2">
            </div>
            <div class="col-md-4">
            <!-- <h3>Densité de végétation</h3> -->
                <IntraParcelFeature v-bind:feat="density"></IntraParcelFeature>
            </div>
            <div class="col-md-4" >
            <!-- <h3>Surface de haie foliaire</h3> -->
                <IntraParcelFeature v-bind:feat="leafWallArea"></IntraParcelFeature>
                <div style="text-align:right; width:100%; font-size:.8em">
                    analogue au LWA (Leaf Wall Area)
                </div>
            </div>
            <div class="col-md-2">
            </div>
        </div>
        
        

    </div> 
</template>
<script>
import IntraParcelFeature from "./IntraParcelFeature"

export default {


    data() {
        return {
            selectedPhenoPhase:this.$store.state.selectedPhenoPhase,  
            selectedParcelName: this.$store.state.selectedParcelName,
            height:"height",
            density:"density",
            thickness:"thickness",
            leafWallArea:"leafWallArea"  
            }
    },

    created() {
        if (!this.$store.getters.getDataIsLoaded) {
            this.$router.push("/");
        }
        
    },

    beforeMount(){
        this.$store.commit("setCurrentNavPath", this.$router.currentRoute.path);
        console.log("$store.state.currentNavPath")
        console.log(this.$store.state.currentNavPath)
    },

    mounted() {
        if (!this.$store.getters.getDataIsLoaded) {
            this.$router.push("/");
        }
    },

    methods: {

    selectIcone(val){
   
        if(val  === 'Debut'){

        document.getElementById('btndebut').style.display='block';
        document.getElementById('btnmilieu').style.display='none';
        document.getElementById('btnfin').style.display='none';}

        else if(val === 'Milieu'){

        document.getElementById('btnmilieu').style.display='block';
        document.getElementById('btndebut').style.display='none';
        document.getElementById('btnfin').style.display='none';}

        else if (val === 'Fin'){
        document.getElementById('btnfin').style.display='block';
        document.getElementById('btndebut').style.display='none';
        document.getElementById('btnmilieu').style.display='none';
        }

    }
  

    
    },

components:{
      
      IntraParcelFeature,
    },

watch: {
       selectedParcelName : function(val){
    this.$store.commit("setSelectedParcelName", val);},
       selectedPhenoPhase : function(val){
          console.log(this.$selectedPhenoPhase)
            this.$store.commit("setSelectedPhenoPhase", val);
            this.selectIcone(val);

    },
    
}}
</script>
<style scoped>
h2{margin-top:15px;background-color: grey;}
h3{margin-top:10px;background-color: rgb(161, 201, 171);width:auto;}
.phenoPhaseSetterView{text-align: center;margin-left: auto;margin-right: auto;margin-top:20px}

p{background-color: black;color: blanchedalmond;
    text-align: center;
}
.row{
  
    text-align: center;margin-left:auto;margin-right: auto;
}

.header { 
    padding: 20px;
    text-align: center;
    color: whitesmoke;
    background-color: darkgrey;
}
</style>

