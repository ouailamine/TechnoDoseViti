<template>
    
      
            <div>
                <b>Caracteristique morphologique: </b>
                <select v-model="selectedFeature" class="custom-select" style="width:200px;">
                    <option 
                        v-for="(feature,index) in features "
                        v-bind:key="index"
                        v-bind:value="feature"
                    >
                        {{translateFr(feature)}}
                    </option>
                </select>
            </div>
        
</template>
<script>




export default {
    components:{
      // map components
        
    },

    props:{
        feat:String
    },

    data() {
        return { 

            features:["height","thickness","density","leafWallArea"],
        }},

    created() {
        // console.log("creating ParcelFeatures")
        // console.log(this.feat)
        this.selectedFeature = this.feat;
    },

    mounted() {
        // console.log("mounting ParcelFeatures")
        // console.log(this.feat)
         this.selectedFeature = this.feat;
    },

    methods: {
        
        getLatLngs(segment){
            // console.log(segment)
            return [segment.orig,segment.dest]
        },

        getColor(val,feature){
            const min = this.$store.getters.getSelectedParcel.stat[feature].min;
            const max = this.$store.getters.getSelectedParcel.stat[feature].max;
            
            // const val = segment[feature]

            const botColor = this.featureRGB[feature].bot
            const topColor = this.featureRGB[feature].top


            const startR = botColor.r
            const evolR =  (val-min)
            const coeffDirR = (botColor.r<=topColor.r)? 1:-1
            
            const startG = botColor.g
            const evolG =  (val-min)
            const coeffDirG = (botColor.g<=topColor.g)? 1:-1
            

            const startB = botColor.b
            const evolB = (val-min)
            const coeffDirB = (botColor.b<=topColor.b)? 1:-1
            

            const r = Math.floor(startR+ coeffDirR *((evolR)/(max-min))* Math.abs(botColor.r -topColor.r));
            const g = Math.floor(startG+ coeffDirG *((evolG)/(max-min))* Math.abs(botColor.g -topColor.g));
            const b = Math.floor(startB+ coeffDirB *((evolB)/(max-min))* Math.abs(botColor.b -topColor.b));

            // console.log(`${feature} rgb(${r},${g},${b})`)

            return `rgb(${r},${g},${b})`
        },

        

        getWeight(segment,feature){
            // 1 <= weight <= 7

            const min = this.$store.getters.getSelectedParcel.stat[feature].min;
            const max = this.$store.getters.getSelectedParcel.stat[feature].max;
            const val = segment[feature]

            let weight = 1+ ((val-min)/(max-min)*6)

            return weight

        },

        getOpacity(segment,feature){
            // 0.5 <= opacity <= 1.0

            const min = this.$store.getters.getSelectedParcel.stat[feature].min;
            const max = this.$store.getters.getSelectedParcel.stat[feature].max;
            const val = segment[feature]

            let opacity = 0.5+ ((val-min)/(max-min)*0.5)

            return opacity
        },

        getPopopContent(segment,feature){
            if(feature==="track"){
                return `(lat:${segment.orig.lat}, lng:${segment.orig.lng})`
            }else{
                return `${this.translateFr(feature)}: ${segment[feature]} ${this.getUnit(feature)} `
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
                    unit = "m"; 
                    break;
                case "leafWallArea": 
                    unit = "m2/ha"; 
                    break; 
                case "appliedDose": 
                    unit = "%"; 
                    break; 
            }
            return unit
        },

        translateFr(sentence){
            let translation = sentence
            switch(sentence){
                case "height": 
                    translation = "hauteur"; 
                    break;
                case "thickness": 
                    translation = "épaisseur"; 
                    break;
                case "density": 
                    translation = "densité végétation"; 
                    break;
                case "leafWallArea": 
                    translation = "Aire mur végétale"; 
                    break; 
                case "appliedDose": 
                    translation = "% dose authorisée"; 
                    break; 
            }
            return translation

        }
    },
    
}
</script>
<style scoped>

.global{height: auto;}
#gauche{grid-area: ga;text-align: center;}



</style>