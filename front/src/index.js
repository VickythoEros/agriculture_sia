import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import AOS from 'aos';
import store from './redux/store'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import 'aos/dist/aos.css'; // aos js module
import  'rsuite/dist/rsuite.min.css'; // react suite modules css
import 'mdb-react-ui-kit/dist/css/mdb.min.css'//bootstrap modules css
import bootstrap from 'bootstrap' // bootstrap
import './index.css';
import 'react-slideshow-image/dist/styles.css'
import 'react-js-cron/dist/styles.css';

AOS.init();// initialisation de Aos js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
