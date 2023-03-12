<template>
  <div
    class="global"
    style="background-image:url(images/pageAccueil.jpg); background-size: 100% 800px;padding:30px;margin: 1px;height: 800px"
    
    >
 
  <div id="title" >
    <router-link to="/InterParcel" class="text-white"> <h1>TechnodoseViti</h1></router-link>
  </div>

  <div id="btnScenario" style="width: auto; opacity:80%;">
    <b-button to="/InterParcel" variant="dark" style="width: auto;">
      <!-- <img src="images/scenario.png"/> -->
      <!-- <br> -->
      <h3>Démonstrateur</h3>
    </b-button>  
    <br>   
  </div>

  <div id="btnGuide">
     <b-button id="btnGuide" variant="dark" v-b-toggle.sidebar-footer style="opacity:80%">
        <!-- <img src="images/guid.png"/> -->
        Mode d'emploi
    </b-button>
  </div>
    
  <hr>
	
  <div id="objective" class="card bg-dark text-white" style="opacity:90%">
      
      <div class="card-body" >
        <p>
        <center><b >
          Comparaison des doses de produits phytosanitaires à appliquer en fonction des caractéristiques de la végétation et de la performance du pulvérisateur : objectif pulvérisation de précision
        </b></center>
        </p>
        <p>
          Dans l’objectif d’optimiser l’utilisation des produits phytosanitaires en vigne, notre approche consiste à prendre en compte à la fois les caractéristiques structurales de la végétation et la typologie du pulvérisateur utilisé pour raisonner les doses à appliquer.
        </p>

        <p > 
            La stratégie mise en œuvre dans la thèse <b> « Modélisation expérimentale et statistique des relations entre caractéristiques morphologiques de la vigne et dépôts de pulvérisation : application à l’agriculture de précision » </b> 
          s’appuie sur le développement de modèles de prédiction des quantités et profils de dépôts de produits phytosanitaires dans la végétation. Ces modèles de distribution de dépôts ont pour paramètres d’entrée d’une part les paramètres végétatifs issus de mesures effectuées avec un capteur LiDAR (hauteur, épaisseur et densité de végétation) et d’autre part de la performance du pulvérisateur.
        </p>

        <p>
          Afin d’évaluer les perspectives de réduction des doses en viticulture, plusieurs scénarios technologiques intégrant différents pulvérisateurs et raisonnements de la dose appliquée sont comparés en termes d’économie d’intrants.
        </p>

        <p>Contacts : Anice CHERAIET (anice.cheraiet@vignevin.com),
          Sebastien CODIS (sebastien.codis@vignevin.com),
          Olivier NAUD (olivier.naud@inrae.fr),
          Mathilde CARRA (mathilde.carra@inrae.fr),
        </p>

        <p>Développeur(s) : Vincent ARMANT et Amin OUAIL, INRAE</p>
      </div>
  </div>
	
  <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
    
    <template v-slot:footer="{ hide }">
      <b-button size="sm" @click="hide">Fermer</b-button>
    </template>

    <div class="px-3 py-2" >
      
        <h5>Bienvenue sur l'application </h5><br>
      

      <p>
        Les données présentées sont issues de l’exploitation Mas Piquet (commune de Grabels), domaine du lycée viticole de Montpellier.
      </p>
      <p>
        Les données de végétation sont issues de l’analyse de capteur LIDAR (modèle LMS100, Sick) monté sur un tracteur et utilisé en proxi-détection dans les rangs de vigne. Les données ont été acquises à trois stades végétatifs (début, milieu et pleine végétation) sur trois parcelles de vigueur contrastée : (i) Aglae (cépage Marselan), (ii) Terre Blanche (cépage Chardonnay) (iii) Franquet (cépage Cabernet Sauvignon).
      </p>
      <p>
        Les modèles de dépôts permettent de prédire la quantité et la distribution des dépôts de produits phytosanitaires au sein du couvert végétal pour trois typologies contrastées de pulvérisateurs en termes de performance avec, du moins au plus précis : (i) une voûte pneumatique passée tous les 4 rangs, (ii) un appareil face par face à jet porté équipé de buses classiques et, (iii) un panneau récupérateur à jet porté. 
      </p>
      <!-- <p>
        L’onglet « Variabilité intra-parcellaire » permet de visualiser les différences de paramètres végétatifs (hauteur de végétation (m), épaisseur de végétation (m), densité de végétation (%) ainsi que la surface de haie foliaire (analogue au LWA (Leaf Wall Area en m{{squarred}}/ha)) au sein d'une parcelle à une date donnée avec résolution spatiale de trois mètres.
      </p> -->
      <p>
        L’onglet « Variabilité inter-parcellaire et temporelle » permet de visualiser et de comparer les paramètres végétatifs (hauteur de végétation (m), épaisseur de végétation (m), densité de végétation (%) ainsi que la surface de haie foliaire (analogue au LWA (Leaf Wall Area en m{{squarred}}/ha)) entre deux parcelles différentes à une même date ou sur une même parcelle à différentes dates. La résolution spatiale est de trois mètres.
      </p>
      <p>
        L’onglet « Comparaison des scénarios technologiques » permet de choisir deux scenarios différents et de comparer par une visualisation graphique les doses appliquées (en pourcentage de la dose homologuée) pour chacun des deux scénarios choisis.
      </p>

      <p>
        Une dose appliquée de 80% (resp. 30%) signifie qu’on applique 80% (resp. 30%) de la dose homologuée et qu’on réduit ainsi de 20% (resp. 70%) la dose par rapport à la dose hectare homologuée.
      </p>
      <p>
        Un scenario technologique se caractérise pas le choix de 3 paramètres : (i) le choix du pulvérisateur qui sert à faire les applications, (ii) le choix de la parcelle (ii) le choix de la date (le stade phénologique de la culture).
      </p>
      <p>
        Deux niveaux de risque en terme de protection phytosanitaire sont proposés et sont à choisir dès l’ouverture de l’onglet.
        Cette notion a été définie en considérant deux distributions de références de dépôts, supposées suffisantes pour assurer la protection de la culture.
      </p>
      <p>  
          Pour l’hypothèse « sécurisée », nous considérons suffisante la distribution de dépôt de produit obtenue en appliquant la pleine dose par hectare (dose homologuée) avec l’appareil le plus performant (face par face jet de technologie jet porté) sur une végétation pleinement développée.
      </p>
      <p>    
        Pour l’hypothèse « risquée », nous considérons suffisante la distribution de dépôt de produit obtenue en appliquant la pleine dose par hectare (dose homologuée) avec l’appareil le moins performant (voûte pneumatique utilisée tous les 4 rangs) sur une végétation pleinement développée. A noter que cette façon de traiter reste majoritaire dans la plupart des vignobles de l’arc méditerranéen
      </p>
    </div>
  </b-sidebar>
 
</div>
  
   
</template>
<script>



export default {
  name: 'Welcome',

   data() {
      return {
        show: false,
        squarred: '\u00B2'
      }
    },

  components: {
    

  },

  async created() {
    if (!this.$store.getters.getDataIsLoaded) {
      await this.$store.dispatch('initTreatedParcels');
    }
  },

  async mounted() {
      if (!this.$store.getters.getDataIsLoaded) {
        await this.$store.dispatch('initTreatedParcels');
      }
  }

}
</script>

<style scoped>

.card-body {  
  overflow-y: scroll; 
  width: 100%; 
  text-align: justify; 
  margin-top: 0px;
  font-size: medium;
  }


@media screen and (min-width: 900px) {
.global {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
   grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);}
 
#title {color:rgb(105, 103, 101);
  grid-column: 1/6;
  grid-row: 1;
}

#btnScenario { 
  width: auto;
  grid-column: 3 ;
  grid-row: 2;
}

#objective {
  grid-column: 2/5;
  grid-row: 4/6;
}

#btnGuide {
  grid-column: 3;
  grid-row: 3;
}}




</style>
