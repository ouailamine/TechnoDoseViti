import Vue from "vue";
import Vuex from "vuex";

import TreatedParcelData from '../services/TreatedParcelData.js'


Vue.use(Vuex);


export default new Vuex.Store({

   state: {

   
      parcelNames: ['Aglae','Franquet','TerreBlanche'],
      actuators: ['faceparface','panneaurecuperateur','voutepneumatique'],
      phenoPhases: ['Debut','Milieu','Fin'],
      hypotheses: ['risque','securise'],


   /**
    * treatedParcel.parcelName.actuator.phenoPhase[centre,area,track]
    */
     treatedParcels : new Map(),
     dataIsLoaded:false,

     selectedParcelName: "Aglae",
     selectedActuator: "faceparface",
     selectedPhenoPhase: "Debut",
     selectedHypothesis: "risque",


     selectedParcelNameG: "Franquet",
     selectedActuatorG: "faceparface",
     selectedPhenoPhaseG: "Debut",
     selectedHypothesisG: "risque",

     selectedParcelNameD: "TerreBlanche",
     selectedActuatorD: "faceparface",
     selectedPhenoPhaseD: "Debut",
     selectedHypothesisD: "risque",
     selectedFeatureD:"height",

     currentNavPath: null

   },


   getters: { // computed methods

      getTreatedParcels: (state) => {
         return state.treatedParcels;
      },

      getParcelNames: (state) =>{
         return state.parcelNames
      },

      getActuators: (state) =>{
         return state.actuators;
      },

      getPhenoPhases: (state) =>{
         return state.phenoPhases;
      },

      getHypotheses:(state) =>{
         return state.hypotheses
      },

      getDataIsLoaded:(state) =>{
         return state.dataIsLoaded
      },

      getSelectedParcel: (state) =>{
         return state.treatedParcels.get(state.selectedParcelName).get(state.selectedActuator).get(state.selectedPhenoPhase).get(state.selectedHypothesis)
      },

      
      getSelectedParcelG: (state) =>{
         return state.treatedParcels.get(state.selectedParcelNameG).get(state.selectedActuatorG).get(state.selectedPhenoPhaseG).get(state.selectedHypothesisG)
      },


      getSelectedParcelD: (state) =>{
         return state.treatedParcels.get(state.selectedParcelNameD).get(state.selectedActuatorD).get(state.selectedPhenoPhaseD).get(state.selectedHypothesisD)
      },

      getCurrentNavPath: (state) =>{
         return state.currentNavPath
      },

   },

   mutations: { // synchronous  commit of changes of state

      initTreatedParcels: (state, treatedParcels) =>{
         state.treatedParcels = treatedParcels;
      },
      validateDataIsLoaded : (state) =>{
         state.dataIsLoaded =true
      },


      setSelectedParcelName: (state,val) =>{
         state.selectedParcelName =val;
         console.log("state.selectedParcelName");
         console.log(state.selectedParcelName);
      },
      setSelectedParcelNameG: (state,val) =>{
         state.selectedParcelNameG =val;
         console.log("state.selectedParcelNameG");
         console.log(state.selectedParcelNameG);
      },

      setSelectedParcelNameD: (state,val) =>{
         state.selectedParcelNameD =val;
         console.log("state.selectedParcelNameD");
         console.log(state.selectedParcelNameD);

      },

     

//setting SelectedActuator,SelectedActuatorDROITE,SelectedActuatorGauche

      setSelectedActuator: (state,val) =>{
         state.selectedActuator =val;
         console.log("state.selectedActuator");
         console.log(state.selectedActuator);
      },
      setSelectedActuatorG: (state,val) =>{
         state.selectedActuatorG =val;
         console.log("state.selectedActuatorG");
         console.log(state.selectedActuatorG);
      },
      setSelectedActuatorD: (state,val) =>{
         state.selectedActuatorD =val;
         console.log("state.selectedActuatorD");
         console.log(state.selectedActuatorD);
      },

//setting selectedPhenoPhase,selectedPhenoPhaseDROITE,selectedPhenoPhaseGAUCHE

      setSelectedPhenoPhase: (state,val) =>{
         state.selectedPhenoPhase =val;
         console.log("state.selectedPhenoPhase");
         console.log(state.selectedPhenoPhase);
      },
      setSelectedPhenoPhaseD: (state,val) =>{
         state.selectedPhenoPhaseD =val;
         console.log("state.selectedPhenoPhaseD");
         console.log(state.selectedPhenoPhaseD);
      },
      setSelectedPhenoPhaseG: (state,val) =>{
         state.selectedPhenoPhaseG =val;
         console.log("state.selectedPhenoPhaseG");
         console.log(state.selectedPhenoPhaseG);
      },

//setting SelectedHypothesis,SelectedHypothesisDROITE,SelectedHypothesisGAUCHE
      setSelectedHypothesis: (state,val) =>{
         state.selectedHypothesis =val;
         console.log("state.selectedHypothesis");
         console.log(state.selectedHypothesis);
      },
      setSelectedHypothesisD: (state,val) =>{
         state.selectedHypothesisD =val;
         console.log("state.selectedHypothesisD");
         console.log(state.selectedHypothesisD);
      },
      setSelectedHypothesisG: (state,val) =>{
         state.selectedHypothesisG =val;
         console.log("state.selectedHypothesisG");
         console.log(state.selectedHypothesisG);
      },

      setCurrentNavPath: (state,val) =>{
         state.currentNavPath=val;
      },


   },

   actions: { // assynchronous commit of changes
      async initTreatedParcels({ state, commit }) {

         let tmpTreatedParcels = new Map()

         for(let parcelName of state.parcelNames){
            tmpTreatedParcels.set(parcelName,new Map)

            for(let actuator of state.actuators){
               tmpTreatedParcels.get(parcelName).set(actuator,new Map())

               for(let phenoPhase of state.phenoPhases){
                  tmpTreatedParcels.get(parcelName).get(actuator).set(phenoPhase,new Map());

                  for(let hypothesis of state.hypotheses){


                  // console.log(`Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}-Hypothese_${hypothesis}`)
                  let treatedParcel = await TreatedParcelData.getTreatedParcel(parcelName,actuator,phenoPhase,hypothesis);
                  // console.log(treatedParcel)

                  tmpTreatedParcels.get(parcelName).get(actuator).get(phenoPhase).set(hypothesis,treatedParcel);

                  }
               }
            }
         }

         commit('initTreatedParcels', tmpTreatedParcels);
         commit ('validateDataIsLoaded')

         console.log(`validateDataIsLoaded: ${state.dataIsLoaded}`)
         console.log("state.treatedParcel")
         console.log(state.treatedParcels)
         
      },


   
      
   }
});

