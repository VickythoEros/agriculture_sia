import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

import "./CarouselHome.css"
import { Carousel } from 'rsuite';

import carrousel1 from '../../assets/images/home/carrousel1.jpg';
import carrousel2 from '../../assets/images/home/carrousel2.jpg';

export default function CarouselHome() {
  
  return (
    <Carousel
      
      autoplay
      className="custom-slider"
   
    >
      <img src={carrousel1} className="img-fluid" />
      <img src={carrousel2} className="img-fluid" />

    </Carousel>
  );
}