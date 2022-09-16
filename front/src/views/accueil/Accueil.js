import React,{useEffect, useState} from 'react';
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';

import Button from '@mui/material/Button';
import CardHome from '../../components/cards/home/CardHome';
import CarouselHome from '../../components/carousel/CarouselHome';
import "./Accueil.css"
import bouclier from '../../assets/images/home/cardimgs/bouclier.png';
import plantsSvg1 from '../../assets/images/home/plants-01.svg';
import plantsSvg2 from '../../assets/images/home/plants-02.svg';
import confort from '../../assets/images/home/cardimgs/physiologie.png';
import precise from '../../assets/images/home/cardimgs/objectif.png';
import ParticulesComponent from '../../components/others/ParticulesComponent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosIntance';
import CardCultures from '../../components/cards/cultures/CardCultures';
import useToken from '../../hooks/useToken';
import { getDataFromServerMeteo } from '../../services/utils';
import { Slide,Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';

const cardItems = [
    {   id:1,
        src:{bouclier},
        alt:'bouclier',
        title:'Sécurisé'
    },
    {   id:2,
        src:{confort},
        alt:'confort',
        title:'Ergonomique'
    },
    {   id:3,
        src:{precise},
        alt:'precise',
        title:'Précise'
    }
]



const getMeteosData = async ()=>{

    const lat = 5.316667
    const lon = -4.033333
    const API_key = "44c491565a23b6487b5d9dedbeefc38f"

     let response =  await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&lang=fr&appid=${API_key}&units=metric`)
     

     let dataWeather =  response.data.daily[0]
    return {description:dataWeather?.weather[0].description,icon:dataWeather?.weather[0].icon,location:response.data.timezone.split('/')[1]}
 
}



const Accueil = ()=>{
    const {setToken, token } = useToken()
    const [meteoDescription,setMeteoDescription]= useState({})
    const [listCultures,setListCultures] = useState([])
    const [stationData,setStattionData] = useState({})
    const navigate = useNavigate()

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
        getMeteosData()
        .then((data)=>{
            setMeteoDescription(data)
            
        })
    
        getDataFromServerMeteo()
        .then((res)=>{
            setStattionData(res)
        })
    },[])

 

    return(
        <div className="accueil-container" >
                <section className="home-header-section">
                <OwlCarousel dotClass="owl-home-carousel-dot" className='owl-theme' responsive= {
               { 0: {
                    items: 1,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    dots: true,
                },
                600: {
                    items: 1,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    dots: true,
                },
                1000: {
                    items: 1,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    dots: true,
                },
            }}  center autoplay lazyLoad loop margin={0}  >
                
                <div className="item home-carousel-item-1 py-2 py-md-5">
                       <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-xl-8 col-lg-7 col-md-7" >
                                        <h1>SIA</h1>
                                        <h6>Système d'Irrigation Automatique</h6>
                                        <h4>
                                        La gestion efficiente de l’eau d’irrigation contribue à l’entretien des cultures à travers
                                        une bonne irrigation. Apportez à vos cultures la quantité  d’eau nécessaire en fonction des différentes phases de
                                        développement.
                                        </h4>
                                        <button className="btn-go-culture" >
                                            Voir mes cultures
                                        </button>
                                </div>
                            <div className="col-xl-4 col-lg-5 col-md-5 text-center text-white">
                                <img alt="" src={`https://openweathermap.org/img/wn/${meteoDescription?.icon}@4x.png`} className='img-fluid'  />
                                <p className="fw-bolder">
                                    {meteoDescription?.description}
                                </p>
                            </div>
                            
                            </div>
                       </div>

                </div>
                <div className="item home-carousel-item home-carousel-item-2 py-2 py-md-5">
                       <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-xl-8 col-lg-7 col-md-7" >
                                        <h1>SIA</h1>
                                        <h6>Système d'Irrigation Automatique</h6>
                                        <h4>
                                        La gestion efficiente de l’eau d’irrigation contribue à l’entretien des cultures à travers
                                        une bonne irrigation. Apportez à vos cultures la quantité  d’eau nécessaire en fonction des différentes phases de
                                        développement.
                                        </h4>
                                        <button className="btn-go-culture" >
                                            Voir mes cultures
                                        </button>
                                </div>
                            <div className="col-xl-4 col-lg-5 col-md-5 text-center text-white">
                                <img alt="" src={`https://openweathermap.org/img/wn/${meteoDescription?.icon}@4x.png`} className='img-fluid'  />
                                <p className="fw-bolder">
                                    {meteoDescription?.description}
                                </p>
                            </div>
                            
                            </div>
                       </div>

                </div>
                <div className="item home-carousel-item home-carousel-item-3 py-2 py-md-5">
                       <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-xl-8 col-lg-7 col-md-7" >
                                        <h1>SIA</h1>
                                        <h6>Système d'Irrigation Automatique</h6>
                                        <h4>
                                        La gestion efficiente de l’eau d’irrigation contribue à l’entretien des cultures à travers
                                        une bonne irrigation. Apportez à vos cultures la quantité  d’eau nécessaire en fonction des différentes phases de
                                        développement.
                                        </h4>
                                        <button className="btn-go-culture" >
                                            Voir mes cultures
                                        </button>
                                </div>
                            <div className="col-xl-4 col-lg-5 col-md-5 text-center text-white">
                                <img alt="" src={`https://openweathermap.org/img/wn/${meteoDescription?.icon}@4x.png`} className='img-fluid'  />
                                <p className="fw-bolder">
                                    {meteoDescription?.description}
                                </p>
                            </div>
                            
                            </div>
                       </div>

                </div>

            </OwlCarousel>
         
                   </section>

           
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
    
        <div className="accueil-certificate-container ">
                <div className="container">
                        <div className="row justify-content-center align-items-center text-center">
                            <div  className="col-md-8 col-sm-10 col-11">
                                <h1 className="" >
                                 Faites confiance à notre plateforme pour la bonne
                                gestion de votre culture
                                </h1>
                            </div>
                        </div>
                        <div className="row justify-content-around align-items-center py-5">
                            <div  data-aos="zoom-in"  className="col-lg-4 col-md-5 col-sm-6 col-11">
                                <div className="card-info ">
                                    <div className="img-content text-center">
                                    <img alt="" src={`https://www.canna.ca/sites/canada/files/2021-02/teaser-mediums-for-growing.jpg`} className='img-fluid'  />
                                    </div>
                                    <div className="text-content text-center" >
                                        <h3>Suivre l'état d'évolution de la culture</h3>
                                        <p>
                                            Rester informer à tout moment de l'état de croissance de la plante. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div  data-aos="zoom-in"  className="col-lg-4 col-md-5 col-sm-6 col-11">
                                <div className="card-info">
                                    <div className="img-content text-center">
                                    <img alt="" src={`https://us.123rf.com/450wm/lekstuntkite/lekstuntkite1601/lekstuntkite160100155/50212898-arrosoir-%C3%A0-petite-usine-dans-la-matin%C3%A9e.jpg`} className='img-fluid'  />
                                    </div>
                                    <div className="text-content text-center">
                                        <h3>Repondre aux bésoin en eaux de la culture</h3>
                                        <p>
                                            Apporter à la plante que la quantité d'eau dont elle a bésoin. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>

       { !!token && (<div className="pt-5 accueil-list-cultures-container container"  >
                <h1 className="text-center" >
                    Prenez soins de vos differentes cultures
                </h1>
                <div className="d-flex justify-content-around flex-wrap mx-auto">
                    
                { listCultures.length===0 ?( <>
                    
                    <h5 className='py-5 text-center text-dark'>
                        Aucune Culture Enregistrer pour l'instant.
                    </h5>
                </>):
                listCultures.map((item, index) =>{

                        return <CardCultures 
                                key={index}
                                {...item}
                                onClickDetailsCulture={onClickDetailsCulture}
                                />
                        

                        })}

                </div>
        </div>)}

        <section className="publicite-container">
            <div className="container"> 
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-md-8 col-sm-10 col-11 py-2 py-md-5">
                        <h1  data-aos="zoom-in"  >
                            
                        Prenez soins de vos cultures 
                        </h1>
                    </div>
                </div>
                <div className="row justify-content-around align-items-center">
                    <div  data-aos="zoom-in"  className="col-lg-6 col-md-6 col-sm-10 col-11">
                        <h3 ><span>.</span> Désherbage  </h3>
                        <h4> Débarrassez votre champ des mauvaises herbes
                        </h4>
                        <p>
                            Cela permet une meilleure absorption des engrais apportés, une meilleure aération et un meilleur apport
                                de lumière à la plante.
                        </p>

                        <h3 ><span>.</span> Fertilisation  </h3>
                        <h4> Nourissez vos plantes
                        </h4>
                        <p>
                        La fertilisation a pour but de mettre à la disposition des plantes les éléments nutritifs nécessaires à
                                un bon rendement.
                        </p>

                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-10 col-11"> 
                        <img  data-aos="zoom-in"  alt="" 
                                src={plantsSvg2}
                                className="img-desherbage" 
                              />   
                        <img  data-aos="zoom-in"  alt=""
                              src={plantsSvg2}
                              className="img-desherbage img-desherbage2 " 
                            /> 
                        
                    </div>
                </div>
            </div>
        </section>

     
        <footer className="bg-dark py-4 text-center m-auto text-white" >
            <p>
                SIA : Système d'irrigation Automatique
            </p>
        </footer>   
        </div>
    )
};

export default Accueil;