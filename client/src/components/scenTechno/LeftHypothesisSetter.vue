<template>
    
        
       <div class="hypothesesSetterView" style="margin-top:20px;">
            Hypothèse :<br>
            <select  v-model="selectedHypothesisG" class="custom-select"
            style="width:auto;margin-top:10px;">
              <option
                v-for="(hypothese, index) in $store.getters.getHypotheses"
                v-bind:key="index"
                v-bind:value="hypothese"
              >
                {{ prettierText(hypothese) }}
              </option>
            </select>
        </div>
    


     
 
</template>
<script>


export default {
    data() {
      return {
              
              selectedHypothesisG:this.$store.state.selectedHypothesisG,
          }
    },

    components:{
      // map components
     
    },

    methods:{
      prettierText(word){
        switch (word) {
          case 'risque':
            return 'risquée'
          case 'securise':
            return 'securisée'

          default:
            return word;
        }
      },

    },

    watch: {
        selectedHypothesisG : function(val){
            this.$store.commit("setSelectedHypothesisG", val);
        },
    },
    
}
</script>
<style scoped>



</style>

