import axios from 'axios'

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5001/';
}

class TreatedParcelData{

    static getTreatedParcel = async (parcelName,actuator,phenoPhase,hypothesis) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    parcelName: parcelName,
                    actuator: actuator,
                    phenoPhase: phenoPhase,
                    hypothesis: hypothesis
                }
                axios.post(url + "treatedParcel", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

    

}
export default TreatedParcelData;
