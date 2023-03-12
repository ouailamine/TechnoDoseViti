<template>
    <div v-if="$store.getters.getDataIsLoaded " style=" margin:10px">
            
        <!-- <div class="row" style="height:40px; text-align:center">
                <b> Caractéristique morphologique :</b>
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
        </div> -->

        <div class="row" >
            <l-map 
                :zoom="currentZoom"
                :center= "$store.getters.getSelectedParcelG.centre"
                :options="mapOptions"
                style="height: 400px; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <div
                v-for="(segment, index) in $store.getters.getSelectedParcelG.pathSegments"
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


        <!-- <div class ="row" style="text-align:center; margin-top:10px; margin-bottom:10px; font-size:.6em;" >
            
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
  -->
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
        // console.log("creating ParcelFeatures")
        // console.log(this.feat)
        // this.selectedFeature = this.feat;
    },

    mounted() {
        // console.log("mounting ParcelFeatures")
        // console.log(this.feat)
        //  this.selectedFeature = this.feat;
         this.currentCenter = this.$store.getters.getSelectedParcelG.centre;
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

            const min = this.$store.getters.getSelectedParcelG.stat[feature].min;
            const max = this.$store.getters.getSelectedParcelG.stat[feature].max;
            const val = segment[feature]

            let weight = 1+ ((val-min)/(max-min)*6)

            return weight

        },

        getOpacity(segment,feature){
            // 0.5 <= opacity <= 1.0

            const min = this.$store.getters.getSelectedParcelG.stat[feature].min;
            const max = this.$store.getters.getSelectedParcelG.stat[feature].max;
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

        getValG(feature, meas){

            let val = this.$store.getters.getSelectedParcelG.stat[feature][meas];
            
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

.row{text-align:center}
</style>