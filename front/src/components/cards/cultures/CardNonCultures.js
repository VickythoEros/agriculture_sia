import { IconButton } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';

import gardeningImg from '../../../assets/images/cultures/planteMorte.jpg'

import "./CardNonCultures.css";

export default function CardNonCultures(){

    return(
        <div data-aos="zoom-in" className="card card-non-cultures text-center m-4">
            <div className="row">
                <div className="card-non-cultures-img-container col-md-4">
                    <img className="img-fluid card-non-cultures-img" src={gardeningImg}/>
                </div>
                <div className="card-non-cultures-text-container col-md-8">
                    <div className="card-non-cultures-text justify-items-center my-auto">
                        <h2 className="mt-5" >
                            Désolé vous n'avez enregistré aucune culture
                        </h2>
                       { /*<IconButton className="mt-5" size="lg" appearance="primary" color="green" icon={<PlusIcon />}>
                        Ajouter une nouvelle culture
    </IconButton>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}