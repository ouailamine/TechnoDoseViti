<template>
    <div v-if="$store.getters.getDataIsLoaded " style=" margin:10px">
            
        <div class="row" style="height:40px;">
            <p style="text-align:center;">
                Caracteristique morphologique
            </p>
        </div>
        <div class ="row" style="height:50px">
            <select v-model="selectedFeature" class="custom-select">
                <option 
                    v-for="(feature,index) in features "
                    v-bind:key="index"
                    v-bind:value="feature"
                >
                    {{translateFr(feature)}}
                </option>
            </select>
        </div>

        <div class="row" >
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 300px; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <div
                v-for="(segment, index) in $store.getters.getSelectedParcel.pathSegments"
                v-bind:item="segment"
                v-bind:index="index"
                v-bind:key="index"
                >
                <l-polyline
                    :lat-lngs="getLatLngs(segment)"
                    :color="getColor(segment[selectedFeature],selectedFeature)"
                    :weight="getWeight(segment,selectedFeature)"
                    :opacity="getOpacity(segment,selectedFeature)"
                    
                >
                    <l-popup :content="getPopopContent(segment,selectedFeature)" />
                </l-polyline>
                </div>
            </l-map>
        </div>

        <div class ="row" style="text-align:center; margin:10px" >
            <span class="col-lg-2">
                légende:
            </span>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcel.stat[selectedFeature].min,selectedFeature)}">
                {{`${$store.getters.getSelectedParcel.stat[selectedFeature].min}${getUnit(selectedFeature)}`}}
            </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcel.stat[selectedFeature].q25,selectedFeature)}">
                {{`${$store.getters.getSelectedParcel.stat[selectedFeature].q25}${getUnit(selectedFeature)}`}}
            </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcel.stat[selectedFeature].median,selectedFeature)}">
                {{`${$store.getters.getSelectedParcel.stat[selectedFeature].median}${getUnit(selectedFeature)}`}}
             </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcel.stat[selectedFeature].q75,selectedFeature)}">
                {{`${$store.getters.getSelectedParcel.stat[selectedFeature].q75}${getUnit(selectedFeature)}`}}
             </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcel.stat[selectedFeature].max,selectedFeature)}">
                {{`${$store.getters.getSelectedParcel.stat[selectedFeature].max}${getUnit(selectedFeature)}`}}
             </b-progress-bar>
        </div>
 
    </div>
</template>
<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, LPopup, LPolyline } from "vue2-leaflet";

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

            features:["height","thickness","density","leafWallArea"],

            selectedFeature:"height",

            featureRGB:{
                height:{
                    bot:{r:50,g:175,b:0}, 
                    top:{r:50,g:75,b:0},
                },

                thickness:{
                    bot:{r:0,g:199,b:50},
                    top:{r:0,g:150,b:50},
                },

                density:{
                    bot:{r:50,g:149,b:50},
                    top:{r:50,g:100,b:50},
                },

                leafWallArea:{
                    bot:{r:0,g:249,b:0},
                    top:{r:0,g:149,b:0},
                },

                appliedDose:{
                    bot:{r:0,g:175,b:200},
                    top:{r:0,g:75,b:200},
                }
            }
        }
    },

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

p{
    text-align: center;
}

.zoom {
    zoom: 4;
    -moz-transform: scale(2);
    -moz-transform-origin: 0 0;
}


</style>