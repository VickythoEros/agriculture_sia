
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from 'rsuite';
import axiosInstance from '../../../api/axiosIntance';

import gardeningImg from '../../../assets/images/cultures/tomate1.jpg'

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
      
        <Panel onClick={()=>onClickDetailsCulture()} shaded className="m-3 card-cultures-container" >
            <div className='d-flex justify-content-between'>
                <div>
                <img className="img-fluid card-cultures-img" src={gardeningImg}/>
                </div>
                <div className="ps-5">
                    <h4  className='text-center' >
                    {nomCulture}
                    </h4>
                <p>
                {
                    descriptionCulture
                }
                </p>
                <div className="mt-3" >
                <h6 className="float-start" >Stade de développement : <span className="text-dark" >
                   {stadeDevInfo?.nom} </span> </h6>
                <h6 className="float-end" >Semaine : <span className="text-dark" > {stadeDevInfo?.periode_semaine} </span> </h6>
                </div>
                </div>
            </div>
          
        </Panel>
        </>
    )
}