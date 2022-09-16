import React, { useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import "./CardHome.css";



export default function CardHome({src,alt,title}) {
 
    
  return (
    <MDBCard className="card-home pt-3" >
      <MDBCardImage className="card-home-image" src={src[alt]} alt={alt} position='top' />
      <MDBCardBody>
        <MDBCardText className="card-home-text font-weight-bold">
         {title}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}