import { useEffect, useState } from 'react';
import { IconButton, Input, InputGroup, } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';

import "./Cultures.css"

import planteImg from '../../assets/images/cultures/field.png'
import CardNonCultures from '../../components/cards/cultures/CardNonCultures';
import CardCultures from '../../components/cards/cultures/CardCultures';
import axiosInstance from '../../api/axiosIntance';


export default function Cultures(){
    let navigate = useNavigate();

    const [listCultures,setListCultures] = useState([])

    const onClickAddNewCulture = ()=>{
        navigate('/ajout_nouvelle-culture',{replace:true,valeur:'toto'})
    }

    const onClickDetailsCulture = (idCulture)=>{
        navigate('/details_culture',{replace:true,idCulture:idCulture})
    }
    
    const chargeListCulture = async () =>{
        const listCultureResponse = await axiosInstance.get('cultures/')
       if(listCultureResponse){
        console.log(listCultureResponse)
        setListCultures(listCultureResponse.data)
       }
    }

    useEffect(()=>{
        chargeListCulture()
    },[])


    return(
        <div className="cultures-container">
            <section className="cultures-heading-container">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-8 col-sm-10 col-11">
                            <h1 >
                                La liste de vos Cultures
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container py-5">
                    <div className='row justify-content-between align-items-center'>
                        <div className="col-md-6 col-sm-6 col-11">
                            <IconButton  onClick={onClickAddNewCulture} size="lg" appearance="primary" color="green" icon={<PlusIcon />}>
                                Ajouter une nouvelle culture
                            </IconButton>
                        </div>
                        <div className="col-md-6 col-sm-6 col-11">
                        <InputGroup size="lg"  inside >
                            <Input placeholder="Rechercher une culture..."/>
                            <InputGroup.Button>
                            <SearchIcon />
                            </InputGroup.Button>
                        </InputGroup>
                        </div>

                    </div>
                </div>
            </section>

            <div className="culture-list-container pt-5">
            { listCultures.length !==0 ?
                    (<div className="culture-lists row mx-auto">

                       { listCultures.map((item, index) =>{

                            return <CardCultures 
                                    key={index}
                                    {...item}
                                    onClickDetailsCulture={onClickDetailsCulture}
                                    />

                       })}
                   
                    

                </div>)
                :
                <CardNonCultures/>
                
                }

            </div>
        </div>
    )
}