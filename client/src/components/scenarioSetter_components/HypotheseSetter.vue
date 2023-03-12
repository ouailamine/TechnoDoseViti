<template>
    
        
       <div class="hypothesesSetterView" style="margin-top:20px;">
            <b>Choisissez une hypothése : </b><br>
            <select   v-model="selectedHypothesis" class="custom-select"
            style="width:auto;margin-top:10px;">
              <option
                v-for="(hypothese, index) in $store.getters.getHypotheses"
                v-bind:key="index"
                v-bind:value="hypothese"
              >
                {{ hypothese }}
              </option>
            </select>
        </div>
    


     
 
</template>
<script>


export default {
    data() {
    return {
            
             selectedHypothesis:this.$store.state.selectedHypothesis,
        }
},

methods: {
  
},

    components:{
      // map components
     
    },

        watch: {
        selectedHypothesis : function(val){
            this.$store.commit("setSelectedHypothesis", val);
        },
    },
    
}
</script>
<style scoped>
.global{height: auto;}

#droite{grid-area:dr;text-align: center;}


  
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

