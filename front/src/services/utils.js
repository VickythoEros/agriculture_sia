import axios from "axios"

const getDataFromServerMeteo = async ()=>{

    let response =  await axios.get("http://stationmeteo:3000/donnees_meteo") 
    return response.data
}

const getEtpFromServerMeteo = async ()=>{
    let response =  await axios.get("http://stationmeteo:3000/etp") 
    return response.data
}








export {
    getDataFromServerMeteo,
    getEtpFromServerMeteo,

}