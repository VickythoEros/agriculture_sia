import React, { useEffect,useState } from 'react'
import {Panel} from 'rsuite'
import axios from "axios"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UpdateIcon from '@mui/icons-material/Update';

import ChartsDetailsCultures from '../../components/charts/ChartsDetailsCultures'
import TablesStadeDeveloppement from '../../components/tableComponents/TablesStadeDeveloppement'

import './DetailsCultures.css'
import TimelineComponent from '../../components/timelineComponent/TimelineComponent';
import { getDataFromServerMeteo } from '../../services/utils';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosIntance';




const getMeteosData = async ()=>{

    const lat = 5.316667
    const lon = -4.033333
    const API_key = "44c491565a23b6487b5d9dedbeefc38f"

     let response =  await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&lang=fr&appid=${API_key}&units=metric`)

     let dataWeather = await response.data.daily.map((item)=>{
        let itemDt = item?.dt* 1000 
        let dateObjectItem = new Date(itemDt).getDay()
        return {description:item.weather[0].description,icon:item.weather[0].icon,dateNumber:dateObjectItem}
     })
     dataWeather.pop()

     return dataWeather
 
}


const WeatherContent = ({description,icon,dateNumber})=>{
    const labelsDay =  [ 'Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    return (
        <Panel shaded className="mx-auto text-center m-3" style={{width:'10rem', height:'10rem'}} >
            <h6 className="fw-bolder" >{labelsDay[dateNumber]}</h6>       
            <div className="" >
                <img alt='weather' src={`https://openweathermap.org/img/wn/${icon}@4x.png`} className='img-fluid' style={{width:'5rem', height:'5rem'}} />
            </div>
            <p>
            {description}
            </p>
        </Panel>
    )
}




export default function DetailsCultures(){

    const [arrosagesData,setArrosagesData] = useState([])
    const [listDaysData,setListDaysData] = useState([])
    const [meteoStation,setMeteoStation] = useState({})
    
    const [cultureInfo,setCultureInfo] = useState([])
    const [stadeDevInfo,setStadeDevInfo] = useState([])
    const location  = useLocation();


    const updateTableData = async()=>{
        const response = await axiosInstance.get(`arrosages/`)
        setArrosagesData(response.data)
    }

    useEffect(()=>{
        getMeteosData()
        .then((data)=>{
            setListDaysData(data)
            // console.log('data weather: ',data)
        })
        getDataFromServerMeteo()
        .then((res)=>{
            // console.log(res)
            setMeteoStation(res)
        })

         axiosInstance.get(`arrosages/`)
         .then((response)=>{
            setArrosagesData(response.data)
         })
       
        
    },[])

  


    useEffect(()=>{
    //  console.log("staet",location.state.idCulture)
     axiosInstance.get(`cultures/${location.state.idCulture}`)
     .then(res=>{
        let dataCulture = res.data
        // console.log(res.data)
        setCultureInfo(dataCulture)
        axiosInstance.get(`stade_developpements/?title=${dataCulture.id} `)
        .then(res=>{
            // console.log("data",res.data[0])
            setStadeDevInfo(res.data[0])
        })
     })

    },[location.state.idCulture])

    return(
        <div className="detail-cultures-container">
            <div className="container pt-5">
                <h2 className="h2" >
                    les details sur la culture
                </h2>
                <div className="row pt-3 ">
                    <div className="col-md-6">
                    <Panel shaded className="" >
                        
                        <img className="img-fluid" src="http://stationarrosage:8081/" alt="http://stationarrosage:8081/"></img>
                    </Panel>
                    </div>
                    <div className="col-md-6 pt-4 align-items-center">
                        <p>
                        {cultureInfo.descriptionCulture}
                        </p>
                    </div>
                </div>

                <div className="details-cultures-stade-develeppement">
                    <div className="row">

                        <div className="col-md-6">
                            <h3 className="h3">
                            Stade de developpement de la culture
                            </h3>
                        </div>

                        <div className="col-md-6">
                            <Button variant="contained" endIcon={<EditIcon />}  className="float-center float-md-end" >
                                Modifier
                            </Button>
                        </div>
                    </div>
                    <div className="detail-stade-dev-container pt-3">
                        <p className='ms-5 mb-5' >Niveau d'évolution de la culture : {stadeDevInfo.periode_semaine} semaine{stadeDevInfo.periode_semaine>1&&'s'} </p>
                        <TimelineComponent stade={stadeDevInfo} />
                    </div>
                </div>
                <div className="styled-devided"></div>
                <div className="details-stade-dev-reserve pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="d-flex" >
                                <p className="span-styled mt-1">

                                </p>
                                <h4>
                                    Historique des arrosages
                                </h4>
                            </div>
                    </div>

                    <div className="mt-3">
                        <div >

                            <Stack direction="row" spacing={5}>
                                <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
                                    Précedent
                                </Button>
                                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                                    Suivant
                                </Button>
                            </Stack>

                        </div>

                            <div className="pt-4">
                               <p>
                                    Données de la semaine du : 
                                    <span className="fw-bold fs-4" >
                                        10 Août 2022 au 17 Août 2022
                                    </span>
                               </p>
                            </div>

                        <Panel shaded className="p-3 mb-5" >
                            <div className="pb-3">
                                <Button onClick={()=>updateTableData()} variant="contained" startIcon={<UpdateIcon />}>
                                    Mettre à jour
                                </Button>
                            </div>
                         <TablesStadeDeveloppement arrosagesData={arrosagesData} />
                        </Panel>
                        
                        <Panel shaded className="mt-5 mb-5 fw-bolder" >
                            <h6>Consommation journalière en eau</h6>
                            <ChartsDetailsCultures arrosagesData={arrosagesData} />
                        </Panel>

                    </div>
                    <div className="mb-5">
                        <h3>
                            Prévisions météorologiques
                        </h3>
                        <div className="d-flex justify-content-between flex-wrap">
                          
                            {
                                listDaysData.map((item,index)=>{
                                    return <WeatherContent {...item} key={index} />
                                })
                            }
                        </div>
                    </div>
                   

                </div>


            </div>
          
        </div>
    )

}
