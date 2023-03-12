var express = require('express');
var router = express.Router();

var TreatedParcel = require('./../../services/TreatedParcel.js')

// POST


router.post('/treatedParcel', async (req, res) => {

    console.log(req.body)

    let parcelName = req.body.parcelName;
    let actuator = req.body.actuator;
    let phenoPhase = req.body.phenoPhase;
    let hypothesis = req.body.hypothesis;


    let treatedParcelTrack = await TreatedParcel.getTrack(parcelName,actuator,phenoPhase,hypothesis)
    
    let treatedParcelSegments = TreatedParcel.getPathSegments(treatedParcelTrack);
    // let treatedParcelArea = await TreatedParcel.getArea(parcelName,actuator,phenoPhase,hypothesis)
    let treatedParcelArea =  TreatedParcel.getConvexHullArea(treatedParcelTrack)

    let treatedParcelCentre = TreatedParcel.getCentre(treatedParcelArea)

    
    let heightStat = TreatedParcel.getStat(treatedParcelTrack,"height")
    let thicknessStat = TreatedParcel.getStat(treatedParcelTrack,"thickness")
    let densityStat = TreatedParcel.getStat(treatedParcelTrack,"density")
    let leafWallAreaStat = TreatedParcel.getStat(treatedParcelTrack,"leafWallArea")
    let appliedDoseStat = TreatedParcel.getStat(treatedParcelTrack,"appliedDose")
    let recupRateStat = TreatedParcel.getStat(treatedParcelTrack,"recupRate")
    

    treatedParcel = {
        track: treatedParcelTrack,
        pathSegments: treatedParcelSegments,
        area: treatedParcelArea,
        centre: treatedParcelCentre,
        stat:{
            height: heightStat,
            leafWallArea: leafWallAreaStat,
            thickness: thicknessStat,
            density: densityStat,
            appliedDose: appliedDoseStat,
            recupRate: recupRateStat,
        }
    }

    res.json(treatedParcel)
    
});




router.post('/allTreatedParcels', async (req, res) => {
    treatedParcels = [];

    let parcelNames = ['Aglae','Franquet','TerreBlanche']
    let actuators = ['faceparface','panneaurecuperateur','voutepneumatique']
    let phenoPhases = ['Debut','Milieu','Fin']
    let hypotheses = ['risque','securise']


    for(let parcelName of parcelNames){
        for(let actuator of actuators){
           for(let phenoPhase of phenoPhases){
              for(let hypothesis of hypotheses){

                let treatedParcelTrack = await TreatedParcel.getTrack(parcelName,actuator,phenoPhase,hypothesis)
    
                let treatedParcelSegments = TreatedParcel.getPathSegments(treatedParcelTrack);
                let treatedParcelArea = await TreatedParcel.getArea(parcelName,actuator,phenoPhase,hypothesis)
                let treatedParcelCentre = TreatedParcel.getCentre(treatedParcelArea)
            
                
                let heightStat = TreatedParcel.getStat(treatedParcelTrack,"height")
                let thicknessStat = TreatedParcel.getStat(treatedParcelTrack,"thickness")
                let densityStat = TreatedParcel.getStat(treatedParcelTrack,"density")
                let leafWallAreaStat = TreatedParcel.getStat(treatedParcelTrack,"leafWallArea")
                let appliedDoseStat = TreatedParcel.getStat(treatedParcelTrack,"appliedDose")
                let recupRateStat = TreatedParcel.getStat(treatedParcelTrack,"recupRate")
                
            
                treatedParcel = {

                    parcelName: parcelName,
                    actuator: actuator,
                    phenoPhase: phenoPhase,
                    hypothesis: hypothesis,

                    track: treatedParcelTrack,
                    pathSegments: treatedParcelSegments,
                    area: treatedParcelArea,
                    centre: treatedParcelCentre,
                    stat:{
                        height: heightStat,
                        leafWallArea: leafWallAreaStat,
                        thickness: thicknessStat,
                        density: densityStat,
                        appliedDose: appliedDoseStat,
                        recupRateStat: recupRateStat,
                    }
                }

                treatedParcels.push(treatedParcel)
              }
           }
        }
     }

    res.json(treatedParcels)
});




module.exports = router;