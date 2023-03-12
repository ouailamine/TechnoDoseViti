<template>
    <div v-if="$store.getters.getDataIsLoaded" style="margin:10px;">

        <div class="row" style="height:40px; " >
            <p>
                Dose appliquée
            </p>
        </div>
        <div class="row" style="height:50px">
            <p>
                (en % de la dose homologuée) 
            </p>
        </div>
        <div class="row">
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
                    
                    :color="getColor(segment[selectedFeature],selectedFeature)"
                    :weight="getWeight(segment,selectedFeature)"
                    :opacity="getOpacity(segment,selectedFeature)"
                    
                >
                    <l-popup :content="getPopopContent(segment,selectedFeature)" />
                </l-polyline>
                </div>
            </l-map>

                   <div class ="row" style="text-align:center; margin:10px ; font-size:.6em;" >
            <span>
                légende:
            </span>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcelD.stat[selectedFeature].min,selectedFeature)}">
                {{`${ getValD(selectedFeature,'min')} ${getUnit(selectedFeature)}`}}
            </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcelD.stat[selectedFeature].q25,selectedFeature)}">
                {{`${ getValD(selectedFeature,'q25' )} ${getUnit(selectedFeature)}`}}
            </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcelD.stat[selectedFeature].median,selectedFeature)}">
                {{`${ getValD(selectedFeature,'median' )} ${getUnit(selectedFeature)}`}}
             </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcelD.stat[selectedFeature].q75,selectedFeature)}">
                {{`${ getValD(selectedFeature,'q75' )} ${getUnit(selectedFeature)}`}}
             </b-progress-bar>
            <b-progress-bar class="col-lg-2" v-bind:style="{ 'background-color': getColor($store.getters.getSelectedParcelD.stat[selectedFeature].max,selectedFeature)}">
                {{`${ getValD(selectedFeature,'max' )} ${getUnit(selectedFeature)}`}}
             </b-progress-bar>
        </div>
        </div><br>

        <div>
            <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Tableau récapitulatif </th>
                            <th>Moyenne</th>
                        </tr>
                    </thead>
                    
                    <tbody>       

                        <tr>
                            <th>Dose appliquée (%)</th>
                            <td>{{getSelectedMeanAppliedDose()}}</td>
                        </tr>
                        
                         <tr v-if="$store.state.selectedActuatorD === 'panneaurecuperateur'">
                            <th> Taux de recupération (%) </th>
                            <td>{{getSelectedMeanRecupRate()}}</td>
                        </tr>

                    </tbody> 
                    
            </table>
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

    


    data() {
        return {
            
            // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            currentZoom: 18,
            currentCenter: latLng(43.658886799781214, 3.8291886498298466),
            mapOptions: {
                zoomSnap: 0.5,
            },

            selectedFeature:"appliedDose",

            featureRGB:{

                appliedDose:{
                    bot:{r:0,g:175,b:200},
                    top:{r:0,g:75,b:200},
                }
            }
        }
    },

    methods: {
        
        getLatLngs(segment){
           
           
            // console.log(segment)
            return [segment.orig,segment.dest]
            
        },

        getColor(val,feature){
            const min = this.$store.getters.getSelectedParcelD.stat[feature].min;
            const max = this.$store.getters.getSelectedParcelD.stat[feature].max;
            
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
            return `${this.translateFr(feature)}: ${segment[feature]} % `
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
                 
                case "appliedDose": 
                    translation = "% dose homologuée"; 
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

.row{
    text-align: center;
}

.zoom {
    zoom: 4;
    -moz-transform: scale(2);
    -moz-transform-origin: 0 0;
}


</style>