
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from 'rsuite';

import Button from '@mui/material/Button';
import axiosInstance from '../../../api/axiosIntance';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import gardeningImg from '../../../assets/images/cultures/tomate1bg.png'

import './CardCultures.css'

export default function CardCultures({id,nomCulture,villeCulture,descriptionCulture}){
    let navigate = useNavigate();
    const [stadeDevInfo,setStadeDevInfo] = useState([])

    const onClickDetailsCulture = ()=>{
        navigate('/details_culture',{replace:true,state:{idCulture:id}})
    }

    useEffect(()=>{
        axiosInstance.get(`stade_developpements/?title=${id} `)
        .then(res=>{
            console.log("data",res.data[0])
            setStadeDevInfo(res.data[0])
        })
    },[id])
  

    return(
        <>
      
        <Panel onClick={()=>onClickDetailsCulture()} shaded className="m-3 panel-culture-card bg-white col-lg-4 col-md-5 col-sm-6 col-11 my-5" >
            <div className="row m-auto text-center p-2">
                <div className="col-12">
                    <img alt="img cuture" className="img-fluid" src={gardeningImg}/>
                </div>
            </div>
            <div className="row panel-culture-card-text">
                <div className="col-12">
                    <h4>
                    {nomCulture}
                    hghghdhd
                    </h4>
                    <div className="p-content">
                            <p>
                            {
                            descriptionCulture
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="row panel-culture-footer justify-content-between align-items-center">
                <div className="col-6">
                    <h6>Stade de développement</h6>
                    <p>
                        {stadeDevInfo?.nom}
                    </p>
                </div>
                <div className="col-6 text-end">
                    <h6>Nombre de semaine</h6>
                    <p >
                    {stadeDevInfo?.periode_semaine}
                    </p>
                </div>
            </div>
            <div className="panel-culture-btn-content">
            <Button  onClick={()=>onClickDetailsCulture()} variant="contained" startIcon={<RemoveRedEyeIcon />}>
                Voir plus
            </Button>
            </div>

          
        </Panel>
        </>
    )
}