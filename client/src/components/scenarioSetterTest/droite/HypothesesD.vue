<template>
    
        
       <div class="hypothesesSetterView" style="margin-top:20px;">
            Hypothèse : <br>
            <select  v-model="selectedHypothesisD" class="custom-select"
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
            
             selectedHypothesisD:this.$store.state.selectedHypothesisD,
        }
},

methods: {
  
},

    components:{
      // map components
     
    },

        watch: {
        selectedHypothesisD : function(val){
            this.$store.commit("setSelectedHypothesisD", val);
        },
    },
    
}
</script>
<style scoped>



</style>

