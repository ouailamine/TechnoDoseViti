<template>

    <div v-if="$store.getters.getDataIsLoaded">
        <div class="actuatorSetterView">
                Actionneur :
            <select id="selectDroite"  v-model="selectedActuatorD" class="custom-select"
            style="width:auto;">
                <option
                    v-for="(actuator, index) in $store.getters.getActuators"
                    v-bind:key="index"
                    v-bind:value="actuator">{{ actuator }}
                </option>
            </select>

            <div class="menuImg" style="margin-top:10px"> 

                <div id="btnpul2D" >
                    <b-button id="iconepul2"  variant="outline-primary"  ><p style="font-size:13px">Face par face Technologie jet porté</p><img src="../../../assets/pul2.png" style="width:150px;height:auto;"></b-button>
                    <b-tooltip target="iconepul2">Face par face Technologie jet porté </b-tooltip>
                </div>

                <div id="btnpul1D" style="display:none;">
                    <b-button id="iconepul1" variant="outline-primary" ><p style="font-size:12px">Voûte pneumatique «4 mains,4 canons» Nouvelle génération</p><img src="../../../assets/pul1.png" style="width:150px;height:auto;"></b-button>
                    <b-tooltip target="iconepul1">Voûte pneumatique «4 mains,4 canons» Nouvelle génération </b-tooltip>
                </div>
        
                <div id="btnpul3D" style="display:none;" >
                    <b-button id="iconepul3" variant="outline-primary" ><p style="font-size:13px">Panneaux récupérateurs Technologie jet porté</p><img src="../../../assets/pul3.png" style="width:150px;height:auto;"></b-button>
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
       
            selectedActuatorD:this.$store.state.selectedActuatorD,
        }
    },

    mounted() {
        this.selectedActuatorD = this.$store.state.selectedActuatorD
        this.selectActuatorBtnDroite(this.selectedActuatorD)
    },

    watch: {
        selectedActuatorD : function(val){
            this.$store.commit("setSelectedActuatorD", val);
            this.selectActuatorBtnDroite(val)
        },
    },
    methods: {
        selectActuatorBtnDroite(val){
            console.log(val);
            if(val === 'faceparface'){
                document.getElementById('btnpul2D').style.display='block';
                document.getElementById('btnpul1D').style.display='none';
                document.getElementById('btnpul3D').style.display='none';}
                
            else if(val === 'voutepneumatique'){
                document.getElementById('btnpul1D').style.display='block';
                document.getElementById('btnpul2D').style.display='none';
                document.getElementById('btnpul3D').style.display='none';}

            else if (val === 'panneaurecuperateur'){
                document.getElementById('btnpul3D').style.display='block';
                document.getElementById('btnpul2D').style.display='none';
                document.getElementById('btnpul1D').style.display='none';
                }

        }
            
    },
}
</script>
<style scoped>
p{background-color: black;color: blanchedalmond;height: 50px;
    text-align: center;
}
.global{height: auto;}
.actuatorSetterView {text-align: center;margin-left: auto;margin-right: auto;}





</style>