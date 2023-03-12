<template>

   <div v-if="$store.getters.getDataIsLoaded">   
        
    <div class="actuatorSetterView">
      Pulvérisateur :
      <select id="selectGauche" v-model="selectedActuatorG" class="custom-select"
      style="width:auto;">
        <option
          v-for="(actuator, index) in $store.getters.getActuators"
          v-bind:key="index"
          v-bind:value="actuator"
        >
          {{ prettierActuator(actuator) }}
        </option>
      </select>

      <div class="menuImg" style="margin-top:10px"> 
            
        <div  id="btnpul2G" >
          <b-button id="iconepul2"  variant="outline-primary"  ><p style="font-size:13px">Face par face Technologie jet porté</p><img src="../../assets/pul2.png" style="width:150px;height:auto;"></b-button>
          <b-tooltip target="iconepul2">Face par face Technologie jet porté </b-tooltip>
        </div>
            
        <div id="btnpul1G" style="display:none;">
          <b-button id="iconepul1" variant="outline-primary" ><p style="font-size:12px">Voûte pneumatique «4 mains,4 canons» Nouvelle génération</p><img src="../../assets/pul1.png" style="width:150px;height:auto;"></b-button>
          <b-tooltip target="iconepul1">Voûte pneumatique «4 mains,4 canons» Nouvelle génération </b-tooltip>
        </div>
            
        <div id="btnpul3G" style="display:none;" >
          <b-button id="iconepul3" variant="outline-primary" ><p style="font-size:13px">Panneaux récupérateurs Technologie jet porté</p><img src="../../assets/pul3.png" style="width:150px;height:auto;"></b-button>
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
       
            selectedActuatorG:this.$store.state.selectedActuatorG,
        }
    },

    mounted() {
        this.selectedActuatorG = this.$store.state.selectedActuatorG
        this.selectActuatorBtnGauche(this.selectedActuatorG)
    },

    watch: {
        selectedActuatorG : function(val){
            this.$store.commit("setSelectedActuatorG", val);
            this.selectActuatorBtnGauche(val);
        },
    },

    methods: {

    prettierActuator(actuator){
          switch (actuator) {
              case 'faceparface':
                return 'Face par Face';
              
              case 'panneaurecuperateur':
                return 'Panneau récupérateur';
              
              case 'voutepneumatique':
                return 'Voûte pneumatique';
                
              default:
                  return actuator;
          }
    },

    selectActuatorBtnGauche(val){
        console.log(val);

      if(val === 'faceparface'){

        document.getElementById('btnpul2G').style.display='block';
        document.getElementById('btnpul1G').style.display='none';
        document.getElementById('btnpul3G').style.display='none';}

      else if(val === 'voutepneumatique'){

        document.getElementById('btnpul1G').style.display='block';
        document.getElementById('btnpul2G').style.display='none';
        document.getElementById('btnpul3G').style.display='none';}

      else if (val === 'panneaurecuperateur'){
        document.getElementById('btnpul3G').style.display='block';
        document.getElementById('btnpul2G').style.display='none';
        document.getElementById('btnpul1G').style.display='none';
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
#gauche{grid-area:dr;}
.actuatorSetterView {text-align: center;margin-left: auto;margin-right: auto;}





</style>