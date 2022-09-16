const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./Models");

const PORT = 5000 || parseInt(process.env.PORT) ;
const base_url_api = "/api/v1" ;

const agriculteursRouter = require('./Routes/agriculteurs.route.js');
const culturesRouter = require('./Routes/cultures.route.js');
const arrosagesRouter = require('./Routes/arrosages.route.js');
const stadeDeveloppementsRouter = require('./Routes/stade_developpements.route.js');
const serverSideRouter = require('./Routes/serverSideEvent.route.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// connexion à la base de donnée via squelize
/*db.sequelize.sync()
  .then(() => {
    console.log("Connexion à la base de donnée établie ...");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
*/

// definition des urls autorisée
var corsOptions = {
    methods: ['GET','POST','DELETE','UPDATE','PUT'],
    origin: "*",
    credentials:true,
    optionsSuccessStatus: 200,
  };




app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(base_url_api,serverSideRouter)
app.use(base_url_api+"/agriculteurs",agriculteursRouter)
app.use(base_url_api+"/cultures",culturesRouter)
app.use(base_url_api+"/arrosages",arrosagesRouter)
app.use(base_url_api+"/stade_developpements",stadeDeveloppementsRouter)







const server= app.listen(PORT, ()=>{
    console.log(`Serveur en cours sur le port : ${PORT} ...`)
})

process.on('unhandledRejection', err =>{
    console.log(`Une erreur est survenie : ${err.message}`)
    server.close(()=>process.exit(1))
} )
