<template>
    <div  v-if="$store.getters.getDataIsLoaded">
        <div id="gauche">
          <div class="phenoPhaseSetterView">
            Stade phénologique : 
            <select id="selectGauche" 
            v-model="selectedPhenoPhaseG" class="custom-select"
            style="width:auto;">
                <option
                  v-for="(phenoPhase, index) in $store.getters.getPhenoPhases"
                  v-bind:key="index"
                  v-bind:value="phenoPhase">{{ phenoPhase }}
                </option>
            </select>

          <div id="menudv1"  style="width:auto;margin-top:10px;" >
              <div id="btndebutG">
                  <b-button id="iconedebut" variant="outline-primary" style="width:auto;" ><p style="font-size:13px">Debut</p><img src="../../../assets/debut.png" style="width:150px;height:auto;"></b-button>
                  <b-tooltip target="iconedebut">Debut</b-tooltip>
              </div>
              <div id="btnmilieuG" style="display:none;">
                  <b-button id="iconemilieu"  variant="outline-primary" style="width:auto;" ><p style="font-size:13px">Milieu</p><img src="../../../assets/milieu.png" style="width:150px;height:auto;"></b-button>
                  <b-tooltip target="iconemilieu">Milieu</b-tooltip>
              </div>
              <div id="btnfinG" style="display:none;">
                  <b-button id="iconefin"  variant="outline-primary" style="width:auto;"><p style="font-size:13px">Fin</p><img src="../../../assets/fin.png" style="width:150px;height:auto;"></b-button>
                  <b-tooltip target="iconefin">Fin</b-tooltip>
              </div> 
          </div>
          </div>
        </div>
    </div>
        


     
   
</template>
<script>


export default {
    data() {
    return {
            
            selectedPhenoPhaseG:this.$store.state.selectedPhenoPhaseG,
        }
},

methods: {



selectBtnPhenoPhaseG(val){
   
    if(val === 'Debut'){

    document.getElementById('btndebutG').style.display='block';
    document.getElementById('btnmilieuG').style.display='none';
    document.getElementById('btnfinG').style.display='none';}

    else if(val === 'Milieu'){

    document.getElementById('btnmilieuG').style.display='block';
    document.getElementById('btndebutG').style.display='none';
    document.getElementById('btnfinG').style.display='none';}

    else if (val === 'Fin'){
        document.getElementById('btnfinG').style.display='block';
        document.getElementById('btndebutG').style.display='none';
        document.getElementById('btnmilieuG').style.display='none';
    }
}
    
},

    components:{
      // map components
     
    },

    mounted() {
        this.selectedPhenoPhaseG = this.$store.state.selectedPhenoPhaseG;
        this.selectBtnPhenoPhaseG(this.selectedPhenoPhaseG)
    },

    

    watch: {
        selectedPhenoPhaseG : function(val){
            this.$store.commit("setSelectedPhenoPhaseG", val);
            this.selectBtnPhenoPhaseG(val)
        },
    },
    
}
</script>
<style scoped>
.global{height: auto;}
#gauche{grid-area: ga;text-align: center;}


  
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

</style>

