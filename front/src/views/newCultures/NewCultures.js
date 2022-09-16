import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Slider from '@mui/material/Slider';

import { Steps,ButtonGroup,Panel ,Button} from 'rsuite';

import './NewCultures.css';



import planteImg from '../../assets/images/cultures/field.png'
import axiosInstance from '../../api/axiosIntance';
import {  useNavigate } from 'react-router-dom';


const stadeDeveloppementsList = [
    {
        name: "Germination",
        value: 0.2
    },
    {
        name: "Floraison",
        value: 0.6
    },
    {
        name: "Mi-recolte",
        value: 0.9
    },
    {
        name: "Fructification",
        value: 0.7
    }
]


const lisMarks = ()=>{
    let table = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

    return table.map((item)=>{ 
        
        return {value:Math.round(item*100/22),label:item}
    } )

}


  function valuetext(value) {

    return value;
  }

export default function NewCultures(){

    const navigate = useNavigate()

    const [isLoadingCulture,setIsLoadingCulture] =  useState(false)

    const [marks,setMarks] =  useState([])


    const [sliderValue,setSliderValue] =  useState(0)
    const [nomCulture,setNomCulture] =  useState('')

    const [villeCulture,setVilleCulture] =  useState('')
    const [stadeDevCulture,setStadeDevCulture] =  useState('')
    const [descriptionCulture,setDescriptionCulture] =  useState('')
    const [dateObservationCulture,setDateObservationCulture] =  useState(Date)

    function onChangeSlider(e) {
        let sliderValue = parseInt(e.target.value)
        setSliderValue(sliderValue);
        console.log(e.target.value)
        
        if(sliderValue <= Math.round(1*100/22)){
            if(parseInt(stadeDevCulture) !== 0.2 ){
                setStadeDevCulture(0.2)
            }
        }
        if((Math.round(1 * 100 / 22) < sliderValue) && (sliderValue <= Math.round(3 * 100 / 22))){
            setStadeDevCulture(0.6)
        }
        if( (Math.round(3 * 100 / 22) < sliderValue) && (sliderValue <= Math.round(9 * 100 / 22))){
            setStadeDevCulture(0.9)
         }
         if( Math.round(9 * 100 / 22) < sliderValue){
             setStadeDevCulture(0.7)
          }
       
      }
  
    const onChangeSelectNomCulture = (e)=>{
        setNomCulture(e.target.value)
    }

    const onChangeSelectVilleCulture = (e)=>{
        setVilleCulture(e.target.value)
    }

    const onChangeSelectStadeDevCulture = (e)=>{
        let valueStade = e.target.value
        setStadeDevCulture(valueStade)
        switch (valueStade) {
            case 0.2:setSliderValue( Math.round(1*100/22)); break;
            case 0.6:setSliderValue( Math.round(3*100/22)); break;
            case 0.9:setSliderValue( Math.round(9*100/22)); break;
            case 0.7:setSliderValue( Math.round(22*100/22)); break;
            default: console.log("valeur inexistante");break;
        }
        

    }

    const giveCultureName=(value)=>{
        let  returnValue;
         switch (value) {
             case 0.2: returnValue = "Germination"; break;
             case 0.6: returnValue = "Floraison"; break;
             case 0.9: returnValue = "Mi-recolte"; break;
             case 0.7: returnValue = "Fructification"; break;
             default: console.log("valeur inexistante");break;
         }
         return  returnValue;
     }
     

    const onChangeSelectDateCulture = (e)=>{
        setDateObservationCulture(e.target.value)
    }

    const onSubmitFormNewCulture = async (e)=>{
        e.preventDefault();
        setIsLoadingCulture(true)

        const cultureData ={
            nom : nomCulture,
            ville: villeCulture,
            descriptionCulture:descriptionCulture,
            agriculteurId: 1
        }
        
        try {
            const responseFirstRequest = await axiosInstance.post("cultures/",cultureData)
            if (responseFirstRequest.status === 200 ){
                console.log(responseFirstRequest)
                const cultureDataStadeDev ={
                    nom : giveCultureName(stadeDevCulture),
                    periode_semaine:  Math.round(sliderValue*22/100) ,
                    cultureId: responseFirstRequest?.data?.message?.id
                }
    
                const responseFirstRequestStade = await axiosInstance.post("stade_developpements/",cultureDataStadeDev)
                if(responseFirstRequestStade){
                    console.log(responseFirstRequestStade)
                    setIsLoadingCulture(false)
                    navigate('/cultures',{replace: true})
                }
    
            }
            
        } catch (error) {
            setIsLoadingCulture(false)
            console.error(error)
        }



    }

    useEffect(()=>{
        setMarks(lisMarks())
    },[])


    return(
        <div className="new-cultures-container">

            <div className="container">
            <div className="new-cultures-heading-container">
                <h3>
                    Enregistrement d'une nouvelle culture
                </h3>
            </div>
            <div >
                <div className="new-cultures-steps-container">
            
                    <div className="">
                        <form onSubmit={onSubmitFormNewCulture} >
                            
                        <Panel shaded className="p-3 mt-5 mb-3" >
                                <h5 className="fw-bolder title-form-new-culture" >
                                    Nom de la culture
                                </h5>
                            <FormControl fullWidth>
                                <InputLabel id="nom-culture-label">Choisissez le type de culture</InputLabel>
                                <Select
                                labelId="nom-culture-label"
                                id="nom-culture"
                                value={nomCulture}
                                label="Choisissez le type de culture"
                                onChange={(e)=>onChangeSelectNomCulture(e)} 
                                >
                                <MenuItem value="Tomate">Tomate</MenuItem>
                                <MenuItem value="Arrachide">Arrachide</MenuItem>
                                </Select>
                            </FormControl>
                        </Panel>
                            
                            <Panel shaded className="p-3 mb-3" >
                                <h5 className="fw-bolder title-form-new-culture" >
                                    Stade de développement de la culture
                                </h5>
                                <FormControl fullWidth>
                                    <InputLabel id="nom-culture-label">Choisir le stade de developpement de la culture</InputLabel>
                                    <Select
                                    labelId="nom-culture-label"
                                    id="nom-culture"
                                    value={stadeDevCulture}
                                    label="Choisir le stade de developpement de la culture"
                                    onChange={(e)=>onChangeSelectStadeDevCulture(e)} 
                                    >

                                    {
                                        stadeDeveloppementsList.map((item,index)=>{
                                            return (
                                                <MenuItem key={index} value={item.value} >{item.name}</MenuItem>
                                            )
                                        })
                                    }

                                    </Select>
                                </FormControl>
                                <p className="mt-3">
                                    Période de developpement de la culture en <span className="fw-bolder" >Semaine : </span> 
                                </p>
                                <Slider
                                    onChange={onChangeSlider}
                                    aria-label="Custom marks"
                                    defaultValue={0}
                                    value={sliderValue}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                />
                            </Panel>
                            <Panel shaded className="p-3 mb-3" >
                            <h5 className="fw-bolder title-form-new-culture" >
                                Nom de la ville de culture
                            </h5>
                            <FormControl fullWidth>
                                <TextField
                                value={villeCulture}
                                 onChange={onChangeSelectVilleCulture} label="Entrez le nom de la ville de culture" variant="outlined" />
                            </FormControl>

                            </Panel>

                            <Panel shaded className="p-3 mb-3" >
                            <h5 className="fw-bolder title-form-new-culture" >
                               Description de la culture
                            </h5>
                            <FormControl fullWidth>
                                <TextField
                                value={descriptionCulture}
                                multiline
                                rows={5}
                                 onChange={(e)=>setDescriptionCulture(e.target.value)} label="Decrivez votre culture" variant="outlined" />
                            </FormControl>

                            </Panel>
                            

                           {/*  
                            <div className="">
                                <div className="row">
                                   
                                    <div className="col-md-6">
                                    <div className="mx-auto text-center">
                                        {/* <img src={planteImg} className="img-fluid new-cultures-card-img-culture"  /> 
                                    </div>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="" className="form-label">Choisir le type de culture</label>
                                            <select onChange={(e)=>onChangeSelectNomCulture(e)} className="form-select" aria-label="Selectionner">
                                                    <option defaultValue="0">Selectionner</option>
                                                    <option value="Tomate">Tomate</option>
                                                    <option value="Arrachide">Arrachide</option>
                                            </select>
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-6 ">
                                    <div className="mx-auto text-center">
                                        {/* <img src={planteImg} className="img-fluid new-cultures-card-img-culture"  /> 
                                    </div>
                                       <div className="mb-3 mt-3">
                                           <label htmlFor="" className="form-label">Choisir le stade de developpement de la culture</label>
                                           <select onChange={(e)=>onChangeSelectStadeDevCulture(e)} className="form-select" aria-label="Selectionner">
                                                   <option defaultValue="0">Selectionner</option>
                                                   <option value="stade 1">Stade 1</option>
                                                   <option value="stade 2">Stade 2</option>
                                                   <option value="stade 3">Stade 3</option>
                                           </select>
                                       </div>
                                   </div>
                                    
                                </div>
                            </div>
                            <div className="">
                                <div className="row">
                                   
                                    <div className="col-md-6">
                                        <div className="mb-3 mt-5">
                                            <label htmlFor="" className="form-label">Entrer la date d'observation  </label>             
                                        <input 
                                            value={dateObservationCulture}
                                            onChange={(e)=>onChangeSelectDateCulture(e)} 
                                            className="form-control py-2 "
                                            type="date"
                                            placeholder="Default input" 
                                            aria-label=""/>


                                        </div>
                                    </div>
                                   
                                    <div className="col-md-6">
                                       <div className="mb-3 mt-5">
                                           <label htmlFor="" className="form-label">Dans quelle ville est la culture ?</label>
                                           <select onChange={(e)=>onChangeSelectVilleCulture(e)} className="form-select" aria-label="Selectionner">
                                                   <option defaultValue="0">Selectionner</option>
                                                   <option value="Abidjan">Abidjan</option>
                                                   <option value="Soubre">Soubre</option>
                                                   <option value="Korhogo">Korhogo</option>
                                           </select>
                                       </div>
                                   </div>
                                    
                                </div>
                            </div>
 */}
                            
                        
                        <div className="my-5 py-3 pb-5 " >
                       
                            <Button loading={isLoadingCulture} type="submit" className="float-end py-3 px-5" appearance='primary'  >
                            Enregistrement
                            </Button>
                            
                        </div>
                        </form>

                    </div>
                    
                </div>
            </div>
            </div>
        </div>
    )
}