<template>
    <div v-if="$store.getters.getDataIsLoaded" style="margin:10px;">
        <div class="row" style="height:40px; " >
            <p>
                Chemin parcouru par le Lidar
            </p>
        </div>
        <div class="row" style="height:50px">
            <!--
            <p>
                Cliquer sur la carte pour plus d'info
            </p>
            -->
        </div>
        <div class="row">
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 300px"
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
                    color= 'lightblue'
                    :opacity=0.9
                    :weight=3
                >
                    <l-popup :content="getPopopContent(segment,'track')" />
                </l-polyline>
                </div>
            </l-map>
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
        }
    },

    

    methods: {
        
        getLatLngs(segment){
            // console.log(segment)
            return [segment.orig,segment.dest]
        },


        getPopopContent(segment,feature){
            if(feature==="track"){
                return `(lat:${segment.orig.lat}, lng:${segment.orig.lng})`
            }
        },

    },
    
}
</script>
<style scoped>


.zoom {
    zoom: 4;
    -moz-transform: scale(2);
    -moz-transform-origin: 0 0;
}


</style>