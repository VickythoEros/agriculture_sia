
import React, { useState } from 'react';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {Button} from 'rsuite'


import './Inscription.css';

import planteImg from '../../assets/images/inscription/farmer.png'
import axiosInstance from '../../api/axiosIntance';


export default function Inscription() {
    const [nomUtilisateur,setNomUtilisateur] = useState('')
    const [prenomUtilisateur,setPrenomUtilisateur] = useState('')
    const [numeroUtilisateur,setNumeroUtilisateur] = useState('')
    const [motDePasse,setMotDePasse] = useState('')

    const [submitLoading,setSubmitLoading] = useState(false)
    

    const onSubmitForm = async (e)=>{

        e.preventDefault();
        setSubmitLoading(true)

        const dataUtilisateur = {
            nom: nomUtilisateur,
            prenom: prenomUtilisateur,
            numero: numeroUtilisateur,
            password: motDePasse
        }

        try {
            const responseRequest =  await axiosInstance.post("agriculteurs/",dataUtilisateur)
            console.log(responseRequest)
            setSubmitLoading(false)
        } catch (error) {
            setSubmitLoading(false)
            console.log(error)
        }
     

    }



  return (
    <div className="inscription-container">
        <div className="container">
            <div data-aos="zoom-in" className="inscription-form-container card">
                <h3 className="text-center" >Inscription</h3>
                <div className="text-center pt-2 pb-5" >
                    <img alt='' className="img-fluid inscription-img" src={planteImg}/>
                </div>
                <form onSubmit={onSubmitForm} >
                    <MDBInput 
                        value={nomUtilisateur}
                        onChange={(e)=>setNomUtilisateur(e.target.value)}
                        className='mb-4 inscription-input'  
                        label='Nom' />

                    <MDBInput 
                        value={prenomUtilisateur}
                        onChange={(e)=>setPrenomUtilisateur(e.target.value)}
                        className='mb-4 inscription-input' 
                        label='Prenom' />

                    <MDBInput 
                        onChange={(e)=>setNumeroUtilisateur(e.target.value)}
                        value={numeroUtilisateur}
                        className='mb-4 inscription-input' 
                        label='Numéro de téléphone' />

                    <MDBInput 
                        onChange={(e)=>setMotDePasse(e.target.value)}
                        value={motDePasse}
                        className='mb-4 inscription-input' 
                        type='password' 
                        label='Mot de passe' />
                    
                
                    <Button loading={submitLoading}  className="inscription-button text-white" type='submit' block>
                    inscription
                    </Button>


                </form>
            </div>
        </div>
    </div>
  );
}