
import React, { useState,useEffect } from 'react';
import { Chart } from 'primereact/chart';


function organisationDataArrosage(data){
  let listJour = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi','vendredi','samedi']
  return data.map((item,index)=>{
    let date = new Date(item.date)
    return {
      jour:listJour[date.getDay()],
      quantite_eau:item.quantite_eau
    }
    
  })
}

const ChartsDetailsCultures = (props) => {
  const [dataChart,setDataChart]= useState(props?.arrosagesData)

    const [basicData,setBasicData] = useState({
        labels: dataChart.map(item=>item.jour),
        datasets: [
            {
                label: 'Quantité d\'eau apportée à la plante ( ml ) ',
                backgroundColor: '#36a9df',
                data:dataChart.map(item=>item.quantite_eau)
            }
        ]
    });

    useEffect(() => {
        setDataChart(organisationDataArrosage(props?.arrosagesData))
        setBasicData({
            labels: organisationDataArrosage(props?.arrosagesData).map(item=>item.jour),
            datasets: [
                {
                    label: 'Quantité d\'eau apportée à la plante ( ml ) ',
                    backgroundColor: '#36a9df',
                    data:organisationDataArrosage(props?.arrosagesData).map(item=>item.quantite_eau)
                }
            ]
        }
        )
    },[props?.arrosagesData])

    return (
        <div>
          

            <div className="card">
                <Chart type="bar" data={basicData}  />
            </div>
        </div>
    )
}
                 
export default ChartsDetailsCultures