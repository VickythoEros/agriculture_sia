import React ,{Suspense, useState} from 'react';
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import { Loader } from 'rsuite';

import FooterApp from './footer/FooterApp';
import NavbarApp from './navbar/NavbarApp';
import routes from '../routes';

import './App.css';
import ParticulesComponent from './others/ParticulesComponent';


const loader = (
  <div>
    <Loader backdrop={true} size="lg" content="Chargement" />
  </div>
);


function App() {
  const [isLogged,setIsLogged] = useState(false)


  return (
    <>
    <BrowserRouter>
      <Suspense fallback={loader} >
        <NavbarApp
         isLogged={isLogged} 
         setIsLogged={setIsLogged} 
         />

        <div className=""  >

        <div className="content-app-container">
        <Routes>
            {
              routes.map( (route,index) =>{
                return (
                  <Route
                  key={index}
                  path={route.path}
                  name={route.name}
                  exact={route.exact}
                  element={
                  <route.element
                    isLogged={isLogged} 
                    setIsLogged={setIsLogged} 
                    />}
                  />
                  
                  )
                })
              }
        </Routes>
        </div>

        {/*<FooterApp/>*/}
              
        </div>
      </Suspense>
    </BrowserRouter>
    
    {/*<ParticulesComponent/>*/}
    </>
  );
}

export default App;
