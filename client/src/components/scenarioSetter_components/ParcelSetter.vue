<template>
    <div v-if="$store.getters.getDataIsLoaded">
        <div id="parcelSetterView" >
            <div id="parcelSetter">
                <b >Choisissez une parcelle : </b>
                <select v-model="selectedParcelName" class="custom-select"
                style="width:auto;">
                <option
                    v-for="(parcelName, index) in $store.getters.getParcelNames"
                    v-bind:key="index"
                    v-bind:value="parcelName"
                >
                    {{ parcelName }}
                </option>
                </select>
            </div><br>
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 500px;"
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-polygon
                    :lat-lngs="$store.getters.getSelectedParcel.area"
                    color="green"
                >
                    <l-popup :content="selectedParcelName" />
                </l-polygon>
                
            </l-map>
        </div>


    </div>
</template>
<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, LPolygon, LPopup} from "vue2-leaflet";

export default {
    components:{
      // map components
        LMap,
        LTileLayer,
        LPopup,
        LPolygon
    },

    data() {
        return {
            selectedParcelName: this.$store.state.selectedParcelName,

            // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            currentZoom: 18,
            currentCenter: latLng(43.658886799781214, 3.8291886498298466),
            mapOptions: {
                zoomSnap: 0.5,
            }
        }
    },


    watch: {
        selectedParcelName : function(val){
            this.$store.commit("setSelectedParcelName", val);
        },

    },

}
</script>
<style scoped>

p{
    text-align: center;
}

#parcelSetterView{
    text-align: center;
    padding: 10px;
}

.phenoPhaseSetterView{text-align: center;margin-left: auto;margin-right: auto;margin-top:20px}
p{background-color: black;color: blanchedalmond;
    text-align: center;
}
img{max-width: 300px;max-height: 300px;}
.phenoPhaseSetterView {grid-area: dv1;margin-top: 10px;}
#title1{grid-area: ti1;text-align: center;}
#menudv1 {grid-area: mdv1;text-align: center;margin-left: auto;margin-right: auto;}
#iconedebut{width: 100%;height: 100%;}
#iconemilieu{width: 100%;height: 100%;}
#iconefin{width: 100%;height: 100%;}
#btndebut{grid-area: btndb;width: auto;height: auto;margin: 40px;}
#btnmilieu{grid-area: btnml;width: auto;height: auto;margin: 40px;}
#btnfin{grid-area: btnfn;width: auto;height: auto;margin: 40px;}


#menudv1{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: auto 1fr;
  grid-template-rows: repeat(1,1fr);
  grid-template-areas:
    "btndb btnml btnfn";
}

</style>