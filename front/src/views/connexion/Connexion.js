
import React, { useState } from 'react';
import {MDBInput,} from 'mdb-react-ui-kit';
import { Link,useNavigate } from 'react-router-dom';
import {Button} from 'rsuite'

import axiosInstance from '../../api/axiosIntance';
import planteImg from '../../assets/images/inscription/plante.gif'

import './Connexion.css';
import useToken from '../../hooks/useToken';

export default function Connexion({isLogged,setIsLogged}) {

    // const dispatch = useDispatch()
    // const {agriculteur,loading} = useSelector((state)=>state.agriculteur)

    const [numeroUtilisateur,setNumeroUtilisateur] = useState('')
    const [motDePasse,setMotDePasse] = useState('')
    const [submitLoading,setSubmitLoading] = useState(false)
    

    const  { setToken } = useToken()
    
    const navigate = useNavigate()


    const onSubmitFormConnexion = async (e)=>{

        e.preventDefault();
        setSubmitLoading(true)

        const dataUtilisateur = {
            numero: numeroUtilisateur,
            password: motDePasse
        }

       
        const responseRequest =  await axiosInstance.post("agriculteurs/auth/",dataUtilisateur)
        console.log(responseRequest)
        if(responseRequest){
            const responseRequestData = responseRequest.data;
            if(responseRequestData.success){
                setToken(responseRequestData)
                setIsLogged(!isLogged)
                navigate('/',{replace: true})
            }
            else{
                console.log("error")
                setSubmitLoading(false)

            }
        }


        setSubmitLoading(false)
    }


  return (
    <div className="connexion-container">
        <div className="container">
        <div data-aos="zoom-in" className="connexion-form-container card">
            <h3 className="text-center" >Connexion</h3>
            <div className="text-center py-5" >
                <img amt="" className="img-fluid connexion-img" src={planteImg}/>
            </div>
            <form onSubmit={onSubmitFormConnexion} >
                <MDBInput 
                    onChange={(e)=>setNumeroUtilisateur(e.target.value)}
                    value={numeroUtilisateur}
                    className='mb-4 connexion-input' 
                    label='Numéro de téléphone' />

                <MDBInput 
                    onChange={(e)=>setMotDePasse(e.target.value)}
                    value={motDePasse}
                    className='mb-4 connexion-input' 
                    type='password' 
                    label='Mot de passe' />

                <div className="">
               <Link className="float-end mb-3" to="motdepase_oublie">Mot de passe oublié?</Link>
                </div>



                <Button loading={submitLoading}  className="connexion-button text-white" type='submit' block>
                Connexion
                </Button>

            </form>
        </div>

        </div>
    </div>
  );
}