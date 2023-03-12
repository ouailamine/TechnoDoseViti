path = require('path');
fs = require('fs');
rl = require('readline');

coordConverter = require("./CoordConverter.js");
geom = require("./Geom.js");
simpleStat = require ("./SimpleStat.js")

class TreatedParcel{

    static parseTreatedParcel(inputDataFName){

        return new Promise((resolve, reject) => {
            try{
                let parcelTrack = []
    
                
                const input = fs.createReadStream(inputDataFName);
                // const output = fs.createWriteStream(outputDataPath)
                const readInterface = rl.createInterface({
                    input: input,
                    // output: output,
                    // console: false
                });
    
    
                input.on('end',() => {
                    console.log(`end of ${inputDataFName} reached`)
                    console.log(`parcelTrack is composed of ${parcelTrack.length} enrichedPoints`)
                    resolve(parcelTrack)
                });
    
                let firstLinePassed =false;

                readInterface.on('line', (line) =>{
                    let raw =line.split(";");
                    if(firstLinePassed && raw.length>5){ // pass header
                        // console.log(`received : ${line}`)
                        let xLamb = parseFloat(raw[0]);
                        let yLamb = parseFloat(raw[1]);
                        let coord = coordConverter.lambert93toWGPS(xLamb,yLamb)
    
                        // console.log(`lamb: (x:${xLamb} y:${yLamb}) => gps : (lng:${coord.lng} lat:${coord.lat})`)
                        
                        if(raw[0]!=="" && raw[1]!=="" && raw[2]!=="" && raw[3]!=="" && raw[4]!=="" && raw[5]!=="" && raw[6]!==""){
                            
                        
                            let enrichedPoint ={
                                lat: coord.lat,
                                lng: coord.lng,
                                height: parseFloat(raw[2]),
                                thickness: parseFloat(raw[3]),
                                density: parseFloat(raw[4]),
                                leafWallArea: parseFloat(raw[5]),
                                appliedDose: parseFloat(raw[6]),
                                recupRate: (raw.length>7? parseFloat(raw[7]):0),
                            }
                            parcelTrack.push(enrichedPoint)

                        }
                    }
                    else{
                        firstLinePassed =true
                        console.log(`file header: ${line}`)
                    }
    
                })
     
            } catch (err) { reject(err); }
        })
    }

    static async getTrack (parcelName,actuator, phenoPhase, hypothesis ){

        let inputDataFolderPath ='./server/data/input/csv/treatedParcelTracks/'
        let outputDataFolderPath ='./server/data/output/json/treatedParcelTracks/'
        
        let treatedParcelTrackJsonFName = path.resolve(
            `${outputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}-Hypothese_${hypothesis}.json`
            )
        let treatedParcelTrack = [];
        try{
            let treatedParcelJsonData = await fs.readFileSync(treatedParcelTrackJsonFName);
            treatedParcelTrack = JSON.parse(treatedParcelJsonData);
            console.log(`loaded ${treatedParcelTrackJsonFName}`)

        }catch(errReadJsonFile){
            try{
                let treatedParcelDataFName = path.resolve(
                    `${inputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}-Hypothese_${hypothesis}.csv`
                    )
                treatedParcelTrack = await this.parseTreatedParcel(treatedParcelDataFName)
                
                try{
                    await fs.writeFileSync(treatedParcelTrackJsonFName, JSON.stringify(treatedParcelTrack));
                }catch(errorWrittingJson){
                    console.log(" Warning File not saved: "+ treatedParcelTrackJsonFName)
                    console.error(errorWrittingJson)
                }
            }catch(errReadDataFile){
                console.error(errReadDataFile)
            }
        }
        console.log(`Number of enriched points in Track: ${treatedParcelTrack.length}`)
        return treatedParcelTrack;
    }





    static async getArea (parcelName, actuator, phenoPhase, hypothesis){
        

        let outputDataFolderPath ='./server/data/output/json/treatedParcelAreas/'
        
        let treatedParcelAreaJsonFName = path.resolve(
            `${outputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}-Hypothese_${hypothesis}.json`
            )
        let treatedParcelArea = [];

        try{
            // Loading convex hull
            let treatedParcelAreaJsonData = fs.readFileSync(treatedParcelAreaJsonFName);
            treatedParcelArea = JSON.parse(treatedParcelAreaJsonData);
            console.log(`loaded ${treatedParcelAreaJsonFName}`)
        }catch(errReadJsonFile){
            // Computing convex hull
            let treatedParcelTrack = await this.getTrack(parcelName, actuator, phenoPhase,hypothesis);
            treatedParcelArea = geom.convexHull(treatedParcelTrack);
            // Saving convex hull
            try{
                fs.writeFileSync(treatedParcelAreaJsonFName, JSON.stringify(treatedParcelArea));
            }catch(errorWrittingJson){
                console.log(" Warning File not saved: "+ treatedParcelAreaJsonFName)
                console.error(errorWrittingJson)
            }
            console.log(`created ${treatedParcelAreaJsonFName}`)
        }

        console.log(`Number of enriched points in Area: ${treatedParcelArea.length}`)
        return treatedParcelArea;
    }


    static getConvexHullArea(enrichedPoints){
        return geom.convexHull(enrichedPoints);
    }

    static getPathSegments(enrichedPoints){
        let pathSegments = [];
        for(let k=0;k<enrichedPoints.length;k++){
            const pi = enrichedPoints[k];
            let pj = (k<(enrichedPoints.length-1))? enrichedPoints[k+1]:enrichedPoints[k];
            if(geom.distance(pi,pj)>10){
                console.log(` ignoring segment pi(${pi.lat},${pi.lng}), pj(${pj.lat},${pj.lng}): ${geom.distance(pi,pj)} meters `)
                pj=pi
            }
            const segment ={
                orig: {lat:pi.lat ,lng:pi.lng},
                dest: {lat:pj.lat ,lng:pj.lng},
                height: pi.height,
                thickness: pi.thickness,
                density: pi.density,
                leafWallArea: pi.leafWallArea,
                authorisedDose: pi.authorisedDose,
                appliedDose: pi.appliedDose
            }
            pathSegments.push(segment)
            
        }
        return pathSegments
    }

    static getCentre (points) {
        let cntrLat =0;
        let cntrLng =0;
        for(let point of points){
            cntrLat += point.lat;
            cntrLng += point.lng;
        }
        if(points.length>0){
            cntrLat = cntrLat/points.length;
            cntrLng = cntrLng/points.length;
        }

        return {lat:cntrLat, lng:cntrLng}
    }

    static getStat(enrichedPoints,feature){
        let arr = []
        
        enrichedPoints.forEach(e => arr.push(e[feature]))

        let sortedArr = simpleStat.asc(arr);

        
        return {
            nbElemts: arr.length,
            sum: simpleStat.sum(arr),
            mean: simpleStat.mean(arr),
            std: simpleStat.std(arr),
            min: simpleStat.quantile(sortedArr, 0,true),
            q25: simpleStat.quantile(sortedArr, .25,true),
            median: simpleStat.quantile(sortedArr, .50,true),
            q75: simpleStat.quantile(sortedArr, .75,true),
            max: simpleStat.quantile(sortedArr, 1,true),
            
            fp1: simpleStat.filteredPercentil(sortedArr, .17,true),
            fp2: simpleStat.filteredPercentil(sortedArr, .37,true),
            fp3: simpleStat.filteredPercentil(sortedArr, .50,true),
            fp4: simpleStat.filteredPercentil(sortedArr, .67,true),
            fp5: simpleStat.filteredPercentil(sortedArr, .84,true),
        }

    }
    


}

module.exports = TreatedParcel;