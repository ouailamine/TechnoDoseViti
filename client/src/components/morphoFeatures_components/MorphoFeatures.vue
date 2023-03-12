<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div class="row" >
            <div class="col-lg-6" >
                <ParcelTrack></ParcelTrack>
            </div>
            <div class="col-lg-6" >
                <ParcelFeatures v-bind:feat="height"></ParcelFeatures>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6" >
                <ParcelFeatures v-bind:feat="density"></ParcelFeatures>
            </div>
            <div class="col-lg-6" >
                <ParcelFeatures v-bind:feat="thickness"></ParcelFeatures>
            </div>
        </div>

    
        <div  style="width: auto;margin-bottom:10px">
    <b-button to="/pulve" variant="dark" style="width: auto;"><b> Analyser les recommendations</b></b-button>     
    </div>
    </div>
</template>
<script>

import ParcelFeatures from "./ParcelFeatures"
import ParcelTrack from "./ParcelTrack"


export default {
    data() {
    return {
        height:"height",
        density:"density",
        thickness:"thickness"
    }
},

    components:{
      // map components
        ParcelFeatures,
        ParcelTrack
    },
    
}
</script>
<style scoped>


.row{
    margin: 20px;
    text-align: center;
}

</style>