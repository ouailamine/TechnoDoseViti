<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div class="actuatorSetterView">
            <b>Choisissez un actionneur :</b><br>
            <select v-model="selectedActuator" @click="selectaa()" class="custom-select"
            style="width:auto;">
              <option
                v-for="(actuator, index) in $store.getters.getActuators"
                v-bind:key="index"
                v-bind:value="actuator"
              >
                {{ actuator }}
              </option>
            </select>

            <div class="menuImg" style="margin-top:10px">
                <div id="btnpul1" style="display:none;">
                  <b-button id="iconepul1" variant="outline-primary" ><p>Voûte pneumatique «4 mains,4 canons» Nouvelle génération</p><img src="../../assets/pul1.png" style="width:300px;height:auto;"></b-button>
                  <b-tooltip target="iconepul1">Voûte pneumatique «4 mains,4 canons» Nouvelle génération </b-tooltip>
                </div>
                <div id="btnpul2" >
                  <b-button id="iconepul2"  variant="outline-primary"  ><p>Face par face Technologie jet porté</p><img src="../../assets/pul2.png" style="width:300px;height:auto;"></b-button>
                  <b-tooltip target="iconepul2">Face par face Technologie jet porté </b-tooltip>
                </div>
                <div id="btnpul3" style="display:none;">
                  <b-button id="iconepul3" variant="outline-primary" ><p>Panneaux récupérateurs Technologie jet porté</p><img src="../../assets/pul3.png" style="width:300px;height:auto;"></b-button>
                  <b-tooltip target="iconepul3">Panneaux récupérateurs Technologie jet porté</b-tooltip>
                </div>
            </div>
        </div>

        

    </div>
</template>
<script>


export default {
    

    data() {
        return {
            selectedActuator:this.$store.state.selectedActuator,
        }
    },
    methods: {
selectaa(){
    console.log(this.selectedActuator);

if(this.selectedActuator === 'faceparface'){

document.getElementById('btnpul2').style.display='block';
document.getElementById('btnpul1').style.display='none';
document.getElementById('btnpul3').style.display='none';}

else if(this.selectedActuator === 'panneaurecuperateur'){

document.getElementById('btnpul1').style.display='block';
document.getElementById('btnpul2').style.display='none';
document.getElementById('btnpul3').style.display='none';}

else if (this.selectedActuator === 'voutepneumatique'){
document.getElementById('btnpul3').style.display='block';
document.getElementById('btnpul2').style.display='none';
document.getElementById('btnpul1').style.display='none';
}



}
    
},

    watch: {
        selectedActuator : function(val){
            this.$store.commit("setSelectedActuator", val);
        },
    },

}
</script>
<style scoped>
p{background-color: black;color: blanchedalmond;height: 50px;
    text-align: center;
}

.actuatorSetterView {text-align: center;margin-left: auto;margin-right: auto;}
#btnpul1{grid-area: btnpl1;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
#btnpul2{grid-area: btnpl2;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
#btnpul3{grid-area: btnpl3;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
</style>