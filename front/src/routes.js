import {lazy} from "react";

// importation des Composants
const Accueil = lazy(()=> import("./views/accueil/Accueil"));
const Connexion = lazy(()=> import("./views/connexion/Connexion"));
const Inscription = lazy(()=> import("./views/inscription/Inscription"));
const Cultures = lazy(()=> import("./views/cultures/Cultures"));
const NewCultures = lazy(()=> import("./views/newCultures/NewCultures"));
const DetailsCultures = lazy(()=> import("./views/detailsCultures/DetailsCultures"));


const routes = [
    { path:"/", element: Accueil, name: "Accueil"},
    { path:"/connexion", element: Connexion, name: "Connexion"},
    { path:"/inscription", element: Inscription, name: "Inscription"},
    { path:"/cultures", element: Cultures, name: "Cultures"},
    { path:"/ajout_nouvelle-culture", element: NewCultures, name: "Ajout Cultures"},
    { path:"/details_culture", element: DetailsCultures, name: "Details Cultures"},

]

export default routes;