import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import Morpho from '../components/morphoFeatures_components/MorphoFeatures';
import ScenarioSetter from '../components/scenarioSetter_components/ScenarioSetter';
import PulveRecommendation from '../components/pulveRecommendation_components/PulveRecommendation';
import CompCaract from '../components/scenarioSetterTest/CompCaract';
import CompScen from '../components/scenarioSetterTest/CompScen';
import CaractParcels from '../components/CaractParcels';

import IntraParcel from '../components/intraParcel/IntraParcel';
import InterParcel from '../components/interParcel/InterParcel';
import ScenTechno from '../components/scenTechno/ScenTechno';

import LegalMentions from '../components/LegalMentions.vue';


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },

    {
      path: '/legalMentions',
      name: 'LegalMentions',
      component: LegalMentions
    },

    {
      path: '/IntraParcel',
      name: 'IntraParcel',
      component: IntraParcel
    },

    {
      path: '/InterParcel',
      name: 'InterParcel',
      component: InterParcel
    },

    {
      path: '/ScenTechno',
      name: 'ScenTechno',
      component: ScenTechno
    },



    {
      path: '/CompCaract',
      name: 'ComparisonCaracteristics',
      component: CompCaract
    },
    {
      path: '/CompScen',
      name: 'CompraisonScenarios',
      component: CompScen
    },

    {
      path: '/CaractParcels',
      name: 'CaracteristicParcels',
      component: CaractParcels
    },
    {
      path: '/scenario',
      name: 'scenario',
      component: ScenarioSetter
    },

    {
      path: '/morpho',
      name: 'morpho',
      component: Morpho
    }, 

    {
      path: '/pulve',
      name: 'pulve',
      component: PulveRecommendation
    }, 

    




    

    

  ]
})
