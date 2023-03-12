<template>
<div>
<div><hr><h2>Comparaison des caractéristiques morphologiques</h2><hr></div>
    <div  class="row">
        <div class="col-md-6" style="border-style: ridge;">
            <div  class="row">
                <div class="col-md-4" style="background-color:#eceff1 ;">
                 <h5 style="margin-top:20px">Scénario 1 :</h5>
                    <br>
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
                    <div id="phenoG"><PhenoPhaseSetterTestG></PhenoPhaseSetterTestG></div>  
                </div>
               <hr>
                <div class="col-md-8">
                    <div id="parcelG"><ParcelFeaturesTestG v-bind:feat="height"></ParcelFeaturesTestG></div>  
                </div> 
            </div> 
         </div>
        <div class="col-md-6" style="border-style: ridge;">
            <div  class="row"> 
                <div class="col-md-8">
                    <div id="parcelD"><ParcelFeaturesTestD v-bind:feat="height"></ParcelFeaturesTestD></div>  
                </div>
                     
                <div class="col-md-4" style="background-color:#eceff1 ;" >
                    <h5 style="margin-top:20px">Scénario 2 :</h5>
                    <br>
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
                <div id="phenoD"><PhenoPhaseSetterTestD></PhenoPhaseSetterTestD></div>
                </div> 
            </div> 
        </div>   
     </div> 
    </div> 
</template>
<script>

import PhenoPhaseSetterTestG from './gauche/PhenoPhaseSetterTestG'
import ParcelFeaturesTestG from './gauche/ParcelFeaturesTestG'

import PhenoPhaseSetterTestD from './droite/PhenoPhaseSetterTestD'
import ParcelFeaturesTestD from './droite/ParcelFeaturesTestD'


export default {
    data() {
    return {
        selectedParcelNameG: this.$store.state.selectedParcelNameG,
        selectedParcelNameD: this.$store.state.selectedParcelNameD,
        height:"height",    
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

        
    },

    components:{
        
        PhenoPhaseSetterTestD,
        ParcelFeaturesTestD,

        PhenoPhaseSetterTestG,
        ParcelFeaturesTestG,
        
        
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

