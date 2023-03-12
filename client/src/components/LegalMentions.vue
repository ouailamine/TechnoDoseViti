<template>
  <div class="global">
    <h4>Mentions légales | Crédits | Confidentialité</h4>
    <p>
      Le site TechnoDoseViti <a href=" https://technodoseviti.herokuapp.com/"> https://technodoseviti.herokuapp.com/</a> est une application web développée par  <a href="https://www.inrae.fr">INRAE</a>.
      Sa publication et son développement sont financés par  <a href="https://www.hdigitag.fr/">#DigitAg</a>, l’Institut Convergences Agriculture Numérique. A ce titre, il a bénéficié d’une aide de l’État gérée par l’Agence Nationale de la Recherche au titre du programme d’Investissements d’Avenir portant la référence ANR-16-CONV-0004.
    </p>

    <ul>
      <li> Les logos et autres contenus présents sur ce site font  l’objet de droits de propriété intellectuelle.  En conséquence, il vous est interdit de les réutiliser sans autorisation préalable.</li>
      <li> Les contenus de nature publique sont utilisables conformément aux conditions de la licence ouverte <a href="https://opensource.org/licenses/MIT">MIT</a>.</li> 
      
        
      
    </ul>

    <h5>Editeur du site </h5>
    <p>
      L'éditeur du site est : <a href="https://www.inrae.fr">INRAE</a>, établissement public à caractère scientifique et technologique. 147 rue de l’Université, 75338 Paris cedex 07, France.
    </p>

    <h5>Développement informatique</h5>

    <p>
      Vincent ARMANT et Amine OUAIL, #DigitAg | INRAE Occitanie-Montpellier | UMR MISTEA.
      L'application a été développée à la demande d' Anice CHERAIET (Doctorant), Sebastien CODIS, Olivier NAUD,  Institut de la Vigne et du Vin. 
    </p>

    <h5>Responsabilité INRAE</h5>

      <ul>
        <li>
          <b>Disponibilité du site.</b> 
          Sauf dispositions légales contraires, INRAE ne garantit aucunement la disponibilité du site et la permanence dans le temps des informations présentes sur le site.
        </li>

        <li>
          <b>Sécurité informatique.</b> 
          Sauf dispositions légales contraires, le site, ses fonctionnalités et contenus ne sont pas garantis contre toute faille de sécurité liée à un piratage, intrusion, bug, virus, logiciel malveillant pouvant affecter votre matériel informatique, vos logiciels ou vos données. Vous utilisez le site, ses fonctionnalités et son contenu à vos propres risques et sous votre entière responsabilité. Vous êtes tenu de prendre toutes les mesures préventives nécessaires à la protection de vos propres données, logiciels et/ou systèmes informatiques pour vous prémunir contre la contamination d’éventuels virus et contre toutes atteintes.
        </li>
      </ul>

    <h5>Responsabilité de l'internaute</h5>
      <ul>
        <li>
          <b>Qualité des contenus.</b>
          Bien qu’INRAE s’efforce de diffuser des contenus fiables, les erreurs, inexactitudes ou omissions ne peuvent être totalement exclues. Vous êtes seul responsable de la consultation, du choix, de l’utilisation et de l’interprétation du contenu de ce site. INRAE ne pourra être tenu, du fait d’une obligation expresse ou tacite, comme responsable envers vous ou des tiers de quelconque dommage direct ou indirect découlant de l’utilisation des informations, et notamment consécutif à une information inexacte ou incomplète, une erreur d’indexation de tout ou partie du site.
        </li>
      </ul>


    <h4>Données à caractère personnel</h4>
      Aucune données à caractère personnel (DCP) n'est recueillie par le présent site.
    
</div>
</template>

<script>
export default {
  
  name: "LegalMentions",
  

  created() {
    
  },

  mounted() {
    
  },

  methods: {},
};
</script>
<style scoped>
.global{padding: 5px;width: auto;height: auto;}
 .title {
    grid-area: tl;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  p{
    text-align: justify;padding-left: 40px;padding-right: 40px;
  }

  ul{
    text-align: justify;padding-left: 40px;padding-right: 40px;
  }


.nav-link{
  text-align: center;
}

</style>
