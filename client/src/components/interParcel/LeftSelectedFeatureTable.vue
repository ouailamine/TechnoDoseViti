<template>
    <div v-if="$store.getters.getDataIsLoaded " style=" margin:10px">

        <div>
            <table class="table table-striped">
                    <tbody>       
                        <tr>
                            <td><b>{{ `Moyenne :`}}</b> </td>
                            <td>{{`${$store.getters.getSelectedParcelG.stat[selectedFeature].mean}${getUnit(selectedFeature)} `}}</td>
                        </tr>
                        <tr>
                            <td><b>{{ `Ecart type :`}}</b></td>
                            <td>{{` ${$store.getters.getSelectedParcelG.stat[selectedFeature].std}${getUnit(selectedFeature)}`}}</td>
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
        return{
            
        }
    },

    

    computed:{

        selectedFeature : function(){
            return this.feat
        },
        
        leftRightFilteredSixthtils: function(){
            console.log(`Begin leftRightFilteredSixthtils`)

            let arr =[]
            this.$store.getters.getSelectedParcelG.track.forEach(e => arr.push(e[this.selectedFeature]))
            this.$store.getters.getSelectedParcelD.track.forEach(e => arr.push(e[this.selectedFeature]))
            
            let sixtils = [.17, .37, .5, .67, .84]
            let values = SimpleStat.filteredPercentilValues(arr,sixtils)
            
            for(let i=0;i<values.length;i++){
                console.log(` sixtil_${i} : ${values[i]}`)
            }

            console.log(`End leftRightFilteredSixthtils`)
            return values

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
            const x  = this.$store.state.treatedParcels.get(this.$store.state.selectedParcelNameG).get(this.$store.state.selectedActuatorG).get(this.$store.state.selectedPhenoPhaseG).get(this.$store.state.selectedHypothesisG).stat.appliedDose.mean
            return Math.round(x*10)/10
        },

        getSelectedMeanRecupRate(){
            const x  = this.$store.state.treatedParcels.get(this.$store.state.selectedParcelNameG).get(this.$store.state.selectedActuatorG).get(this.$store.state.selectedPhenoPhaseG).get(this.$store.state.selectedHypothesisG).stat.recupRate.mean
            return Math.round(x*10)/10
        }
    },
    
}
</script>
<style scoped>

p{
    text-align: center;
}



.row{text-align:center}
</style>