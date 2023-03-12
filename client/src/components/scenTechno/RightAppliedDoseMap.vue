<template>
    <div v-if="$store.getters.getDataIsLoaded " style=" margin:10px">
        
        
            <l-map 
                :zoom="currentZoom"
                :center= "$store.getters.getSelectedParcelD.centre"
                :options="mapOptions"
                style="height: 400px; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <div
                v-for="(segment, index) in $store.getters.getSelectedParcelD.pathSegments"
                v-bind:item="segment"
                v-bind:index="index"
                v-bind:key="index"
                >
                <l-polyline
                    :lat-lngs="getLatLngs(segment)"
                    :color="getNewColor(segment[selectedFeature])"
                     :weight="5"
                >
                <!-- :weight="getWeight(segment,selectedFeature)"
                    :opacity="getOpacity(segment,selectedFeature)" -->

                    <l-popup :content="getPopopContent(segment,selectedFeature)" />
                </l-polyline>
                </div>
            </l-map>
    </div>

</template>
<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, LPopup, LPolyline } from "vue2-leaflet";
import SimpleStat from "../../services/SimpleStat.js"
export default {
    components:{
      // map components
        LMap,
        LTileLayer,
        LPopup,
        LPolyline
    },

    props:{
        feat:String
    },

    data() {

          return {
            
            animate: true,
            // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            currentZoom: 18,
            currentCenter: latLng(43.658886799781214, 3.8291886498298466),
            mapOptions: {
                zoomSnap: 0.5,
            },

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
        // console.log("creating ParcelFeatures")
        // console.log(this.feat)
    
    },

    mounted() {
        // console.log("mounting ParcelFeatures")
        // console.log(this.feat)
        this.currentCenter = this.$store.getters.getSelectedParcelD.centre;
    },

    methods: {
        
        getLatLngs(segment){
            // console.log(segment)
            return [segment.orig,segment.dest]
        },

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

        

        getWeight(segment,feature){
            // 1 <= weight <= 7

            const min = this.$store.getters.getSelectedParcelD.stat[feature].min;
            const max = this.$store.getters.getSelectedParcelD.stat[feature].max;
            const val = segment[feature]

            let weight = 1+ ((val-min)/(max-min)*6)

            return weight

        },

        getOpacity(segment,feature){
            // 0.5 <= opacity <= 1.0

            const min = this.$store.getters.getSelectedParcelD.stat[feature].min;
            const max = this.$store.getters.getSelectedParcelD.stat[feature].max;
            const val = segment[feature]

            let opacity = 0.5+ ((val-min)/(max-min)*0.5)

            return opacity
        },

        getPopopContent(segment,feature){
            if(feature==="track"){
                return `(lat:${segment.orig.lat}, lng:${segment.orig.lng})`
            }else{
                let val = segment[feature];
                if(val<0){
                    val = 0;
                }
                return `${this.translateFr(feature)}: ${val} ${this.getUnit(feature)} `
            }

        },

        getValD(feature, meas){

            let val = this.$store.getters.getSelectedParcelD.stat[feature][meas];
            
            // console.log(`getVal(${feature},${meas}): ${val}`)
            
            if(val<0)
                val = 0;
            if(feature=== 'density' || feature === 'appliedDose'){
                val= Math.round(val);
            }
            return val;
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