<template>
    <div v-if="$store.getters.getDataIsLoaded " style=" margin:10px">

        <div>
            <table class="table table-striped">
                <tbody>       
                        <tr>
                            <td><b>{{ `Moyenne :`}}</b> </td>
                            <td>{{`${$store.getters.getSelectedParcelD.stat[selectedFeature].mean}${getUnit(selectedFeature)} `}}</td>
                        </tr>
                        <tr>
                            <td><b>{{ `Ecart type :`}}</b></td>
                            <td>{{` ${$store.getters.getSelectedParcelD.stat[selectedFeature].std}${getUnit(selectedFeature)}`}}</td>
                        </tr>
                        <tr v-if="$store.state.selectedActuatorD === 'panneaurecuperateur'">
                            <td><b> Taux de recupération :</b></td>
                            <td>{{`${getSelectedMeanRecupRate()}%`}}</td>
                        </tr>
                    </tbody> 
            </table>
        </div>
    
    </div>
</template>
<script>


import SimpleStat from "../../services/SimpleStat.js"
export default {
    components:{
      
    },

    props:{
        feat:String
    },

    data() {

          return {

            selectedFeature : "appliedDose"

            
        }
    },

    computed:{

        leftRightFilteredSixthtils: function(){
            let arr =[]
            this.$store.getters.getSelectedParcelG.track.forEach(e => arr.push(e[this.selectedFeature]))
            this.$store.getters.getSelectedParcelD.track.forEach(e => arr.push(e[this.selectedFeature]))
            
            return SimpleStat.filteredPercentilValues(arr,[.17,.37,.50,.67,.84])

        },
    },

    created() {
    
    },

    mounted() {
        
    },

    methods: {
        


        getUnit(feature){
            let unit =''
            switch(feature){
                case "height": 
                    unit = "m"; 
                    break;
                case "thickness": 
                    unit = "m"; 
                    break;
                case "density": 
                    unit = "%"; 
                    break;
                case "leafWallArea": 
                    unit = "m\u00B2/ha"; 
                    break; 
                case "appliedDose": 
                    unit = "%"; 
                    break; 
            }
            return unit
        },


        getSelectedMeanAppliedDose(){
            const x  = this.$store.state.treatedParcels.get(this.$store.state.selectedParcelNameD).get(this.$store.state.selectedActuatorD).get(this.$store.state.selectedPhenoPhaseD).get(this.$store.state.selectedHypothesisD).stat.appliedDose.mean
            return Math.round(x*10)/10
        },

        getSelectedMeanRecupRate(){
            const x  = this.$store.state.treatedParcels.get(this.$store.state.selectedParcelNameD).get(this.$store.state.selectedActuatorD).get(this.$store.state.selectedPhenoPhaseD).get(this.$store.state.selectedHypothesisD).stat.recupRate.mean
            return Math.round(x*10)/10
        }
    },
    
}
</script>
<style scoped>

p{
    text-align: center;
}

.zoom {
    zoom: 4;
    -moz-transform: scale(2);
    -moz-transform-origin: 0 0;
}


</style>