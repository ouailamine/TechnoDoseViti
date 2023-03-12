<template>
       <div class="row">
         <div class="col-md-4"></div>
         <div class="col-md-2" style="margin-top:5px">
            <b>Hypothèse :</b>
        </div>
        <div class="col-md-2">
            <select  v-model="selectedHypothesis" class="custom-select" style="width:auto;">
              <option
                v-for="(hypothese, index) in $store.getters.getHypotheses"
                v-bind:key="index"
                v-bind:value="hypothese"
              >
                {{ prettierText(hypothese) }}
              </option>
            </select>
         </div>
        <div class="col-md-4"></div>
      </div>
</template>
<script>


export default {
    data() {
      return {
            selectedHypothesis:"risque",
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
        selectedHypothesis : function(val){
            this.$store.commit("setSelectedHypothesisG", val);
            this.$store.commit("setSelectedHypothesisD", val);
        },
    },
    
}
</script>
<style scoped>



</style>

