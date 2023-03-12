<template>
<div>
    <div><h2>Comparaison des scénarios technologiques</h2></div>
    <div class="row">
        <div class="col-md-2" style="background-color:#eceff1 ;" >
            <h5 style="margin-top:20px">Scénario 1 :</h5>
                    <hr>
                    <div id="parcelSetterView" >
                        <div id="parcelSetter" style="margin-bottom:10px">
                            Parcelle : 
                            <br>
                            <select v-model="selectedParcelNameG" class="custom-select" style="width:auto;">
                                <option
                                v-for="(parcelName, index) in $store.getters.getParcelNames"
                                v-bind:key="index"
                                v-bind:value="parcelName">{{ parcelName }}
                                </option>
                            </select>
                        </div>
                    </div> 
                    <hr>   
                    <div id="phenoG"><LeftPhenoPhaseSetter></LeftPhenoPhaseSetter></div>  
                    <div id="actuatorG"><LeftActuatorSetter></LeftActuatorSetter></div>
        </div>


        <div class="col-md-8" >

            <div class="row" >
                <p style="text-align:center; width:100%; margin:5px">
                    « Dose à appliquer (en % de la dose homologuée) pour assurer le dépôt de référence »
                </p>
            </div>
            
            <div class="row">
                <div id="hypothesis" class="col-md-12">
                    <LeftRightHypothesisSetter></LeftRightHypothesisSetter>
                </div>
            </div>

            
            <div class="row">
                <div class="col-md-6">
                    <div id="parcelG"><LeftAppliedDoseMap></LeftAppliedDoseMap></div>  
                </div>
                <div class="col-md-6">
                    <div id="parcelD"><RightAppliedDoseMap></RightAppliedDoseMap></div>  
                </div>
                
            </div>

            <div class="row">
                <div  class="col-md-12">
                    <LeftRightAppliedDoseLegend></LeftRightAppliedDoseLegend>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div id="tableG"><LeftAppliedDoseTable></LeftAppliedDoseTable></div>  
                </div>
                <div class="col-md-6">
                    <div id="tableD"><RightAppliedDoseTable></RightAppliedDoseTable></div>  
                </div>
            </div>





        </div>


        <div class="col-md-2" style="background-color:#eceff1 ;" >
                    <h5 style="margin-top:20px">Scénario 2 :</h5>
                    <hr>
                <div id="parcelSetterView" >
                    <div id="parcelSetter" style="margin-bottom:10px">
                        Parcelle : 
                        <br>
                        <select v-model="selectedParcelNameD" class="custom-select" style="width:auto;">
                            <option
                            v-for="(parcelName, index) in $store.getters.getParcelNames"
                            v-bind:key="index"
                            v-bind:value="parcelName">{{ parcelName }}
                            </option>
                        </select>
                    </div>
                </div>
                <hr> 
                <div id="phenoD"><RightPhenoPhaseSetter></RightPhenoPhaseSetter></div>
                <div id="actuatorG"><RightActuatorSetter></RightActuatorSetter></div>
        </div> 
    </div>

</div> 
</template>
<script>


// import InterParcelFeature from './InterParcelFeature'


import LeftAppliedDoseMap from './LeftAppliedDoseMap'
import LeftAppliedDoseTable from './LeftAppliedDoseTable'
import LeftPhenoPhaseSetter from './LeftPhenoPhaseSetter'
import LeftActuatorSetter from './LeftActuatorSetter'

import RightAppliedDoseMap from './RightAppliedDoseMap'
import RightAppliedDoseTable from './RightAppliedDoseTable'
import RightPhenoPhaseSetter from './RightPhenoPhaseSetter'
import RightActuatorSetter from './RightActuatorSetter'

import LeftRightHypothesisSetter from './LeftRightHypothesisSetter'
import LeftRightAppliedDoseLegend from './LeftRightAppliedDoseLegend'
 


export default {

    components:{

        RightAppliedDoseMap,
        RightAppliedDoseTable,
        RightPhenoPhaseSetter,
        RightActuatorSetter,

        
        LeftAppliedDoseMap,
        LeftAppliedDoseTable,
        LeftPhenoPhaseSetter,
        LeftActuatorSetter,

        LeftRightHypothesisSetter,
        LeftRightAppliedDoseLegend
        
    },

    data() {
    return {
        selectedParcelNameG: this.$store.state.selectedParcelNameG,
        selectedParcelNameD: this.$store.state.selectedParcelNameD,

        features:["height","thickness","density","leafWallArea"],

        selectedFeature:"thickness",

        
        
        
        }
    },

    computed:{
        selectedParams : function() {
            return{
                feature: this.selectedFeature,
                parcelNameG : this.selectedParcelNameG,
                parcelNameD : this.selectedParcelNameG
            }
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

        translateFr(sentence){
            let translation = sentence
            switch(sentence){
                case "height": 
                    translation = "Hauteur de végétation"; 
                    break;
                case "thickness": 
                    translation = "Épaisseur de végétation"; 
                    break;
                case "density": 
                    translation = "Densité de végétation"; 
                    break;
                case "leafWallArea": 
                    translation = "Surface de haie foliaire"; 
                    break; 
                case "appliedDose": 
                    translation = "% dose authorisée"; 
                    break; 
            }
            return translation
        }
        
    },

    

    watch: {
        selectedParcelNameG : function(val){
            this.$store.commit("setSelectedParcelNameG", val);
        },

        selectedParcelNameD : function(val){
            this.$store.commit("setSelectedParcelNameD", val);
        },
        
    }
}
</script>
<style scoped>
h2{margin-top:15px;background-color: grey;}
.global{text-align: center; margin-left:auto;margin-right: auto;}
#phenoD{grid-area:phD;text-align: center;margin-top: 20px;}
#actuatorD{grid-area:actD;text-align: center;margin-top: 20px;}
#parcelD{grid-area:parD;text-align: center;margin-top: 20px;}
#caracteristiqueD{grid-area:cartD;text-align: center;margin-top: 20px;}
#phenoG{grid-area:phG;text-align: center;margin-top: 20px;}
#actuatorG{grid-area:actG;text-align: center;margin-top: 20px;}
#parcelG{grid-area:parG;text-align: center;margin-top: 20px;}
#caracteristiqueG{grid-area:cartG;text-align: center;margin-top: 20px;}




</style>

