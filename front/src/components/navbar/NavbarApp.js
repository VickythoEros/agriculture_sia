import React, { useEffect } from 'react';
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import useToken from '../../hooks/useToken';
import {Button,Stack} from '@mui/material';
import siaLogo from '../../assets/images/sia3.png'
import "./NavbarApp.css";
  
  const NavbarApp = ({isLogged,setIsLogged}) => {

    const   [tokenUser, setUserToken ] = React.useState("")
    const  { setToken,deleteToken, token } = useToken()

    const navigate = useNavigate()

    const onLogout = ()=>{
      deleteToken()
      setIsLogged(!isLogged)
      window.location.reload()
      navigate('/',{replace: true})
    }

    useEffect(()=>{

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      setUserToken( userToken?.token)
     
    },[isLogged])
    
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light  fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex flex-column" href="/">
            <img
            src={siaLogo}
            className="img-fluid"
            alt='Sia logo'
             />
             <p>Système d'Irrigation Automatique</p>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <NavLink to="/" >Accueil</NavLink>
              </li>

          {   tokenUser? (<>     
              <li className="nav-item">
                <NavLink to="/cultures" >Mes Cultures</NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink to="/mon_compte" >Mon profil</NavLink>
              </li>
              <li className="nav-item">
              <Button
               color="error"
               onClick={()=>onLogout() }
               variant="outlined">Déconnexion</Button>
              </li>
           
              </>)
              :
             ( <>
              <li className="nav-item">
                <NavLink to="/inscription" >S'inscrire</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/connexion" >Connexion</NavLink>
              </li>
              </>)
              }
            
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
export default NavbarApp ;
