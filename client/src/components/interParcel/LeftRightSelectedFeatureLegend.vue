<template>
    <div v-if="$store.getters.getDataIsLoaded " style="margin-left:25px; margin-right:25px;">

        <div class ="row" style="text-align:center; margin-top:10px; margin-bottom:10px; font-size:.7em;" >
            
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{'background-color': getRGB_fp(1)}">
                {{`&le;${leftRightFilteredSixthtils[0]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{'background-color': getRGB_fp(2)}">
                {{`&le;${leftRightFilteredSixthtils[1]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{ 'background-color': getRGB_fp(3)}">
                {{`&le;${leftRightFilteredSixthtils[2]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{ 'background-color': getRGB_fp(4)}">
                {{`&le;${leftRightFilteredSixthtils[3]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{ 'background-color': getRGB_fp(5)}">
                {{` &le;${leftRightFilteredSixthtils[4]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            <b-progress-bar class="col-md-2" style ="color:green;" v-bind:style="{ 'background-color': getRGB_fp(6)}">
                {{`>${leftRightFilteredSixthtils[4]}${getUnit(selectedFeature)}`}} 
            </b-progress-bar>
            
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
           
            
            features:["height","thickness","density","leafWallArea"],

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
      

        getNewColor(val){
            let val_fpi =0;
            for(let i=1;i<=5;i++){
                // val_fpi = this.$store.getters.getSelectedParcelG.stat[feature][`fp${i}`]
                val_fpi = this.leftRightFilteredSixthtils[i-1]
                if(val<=val_fpi){
                     return this.getRGB_fp(i)
                }
            }
            return this.getRGB_fp(6)
        },

        

        getRGB_fp(i){

            switch (i) {
                case 1:
                    return 'rgb(255, 255, 204)';
                case 2:
                    return 'rgb(255, 255, 102)';
                case 3:
                    return 'rgb(255, 204, 102)';
                case 4:
                    return 'rgb(255, 153, 51)';
                case 5:
                    return 'rgb(255, 102, 0)';
                case 6:
                    return 'rgb(255, 0, 0)';

                default:
                    return 'rgb(0, 0, 0)';
            }
        },


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

.row{text-align:center}
</style>