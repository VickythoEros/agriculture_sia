
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { BarChart, CartesianGrid,XAxis,YAxis,Bar,Tooltip ,Legend} from 'recharts';
const ChartsStationData = (props) => {
  
    const data = [
        {
          "name": "",
          "humidite de l'air": props.meteoStation?props.meteoStation?.humidite_air:0,
          "temperature de l'air":  props.meteoStation?props.meteoStation?.temperature_air:0,
          "précipitation":  props.meteoStation?props.meteoStation?.precipitation:0,
          "vitesse du vent":  props.meteoStation?props.meteoStation?.vitesse_vent:0
        },
        
      ]
      

    return (
        <div>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="humidite de l'air" fill="#8884d8" />
            <Bar dataKey="temperature de l'air" fill="#bb6713" />
            <Bar dataKey="precipitation" fill="#23cc5b" />
            <Bar dataKey="vitesse du vent" fill="#1ce" />
        </BarChart>
        </div>
    )
}
                 
export default ChartsStationData