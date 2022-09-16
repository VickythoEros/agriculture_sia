const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const db = {};

// initialisation d'une nouvelle instance de la base de donnée
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


// definition des tables 
const Agriculteurs = sequelize.define("agriculteurs",{
          
    nom : {type: DataTypes.TEXT, allowNull: false },
    prenom : {type: DataTypes.TEXT, allowNull: false},
    numero : {type: DataTypes.STRING, allowNull: false,unique: true},
    status : {
        type: DataTypes.ENUM,
        values :['activé',"en attente","supprimé"],
        allowNull: false,
        defaultValue: "en attente",
        },

    password : {type: DataTypes.TEXT, allowNull: false},

    nomComplet: {
        type: DataTypes.VIRTUAL,
        get(){
            return `${this.prenom} ${this.nom}`
        },
        set(value){
            throw new Error("le champ nomComplet, n'est pas à renseigner!!!")
        }
    }
})



const Cultures = sequelize.define("cultures",{
        
    nom : {type: DataTypes.TEXT, allowNull: false },
    descriptionCulture : {type: DataTypes.TEXT, allowNull: false },
    ville : {type: DataTypes.TEXT, allowNull: false},
    
})



const Arrosages = sequelize.define("arrosages",{
        
  quantite_eau : {type: DataTypes.STRING, allowNull: false },
  date : {type: DataTypes.DATE, allowNull: false},
 
})



const StadeDeveloppements = sequelize.define("stadeDeveloppements",{
        
  nom : {type: DataTypes.TEXT, allowNull: false },
  periode_semaine : {type: DataTypes.NUMBER, allowNull: false},
 
})




// definition de la relation qui relie la table Cultures et StadeDeveloppements
Cultures.hasMany(StadeDeveloppements)
StadeDeveloppements.belongsTo(Cultures)


// definition de la relation qui relie la table Cultures et Arrosages
// Cultures.hasMany(Arrosages)
// Arrosages.belongsTo(Cultures)


// definition de la relation qui relie la table Cultures et Agriculteurs
Agriculteurs.hasMany(Cultures)
Cultures.belongsTo(Agriculteurs)




db.Sequelize = Sequelize;
db.sequelize = sequelize;
/*db.agriculteurs = require("./agriculteurs.model.js")(sequelize, DataTypes);
db.cultures = require("./cultures.model.js")(sequelize, DataTypes);
db.arrosages = require("./arrosages.model.js")(sequelize, DataTypes);
db.stade_developpements = require("./stade_developpements.model.js")(sequelize, DataTypes);*/

db.agriculteurs = Agriculteurs;
db.cultures = Cultures;
db.arrosages = Arrosages;
db.stade_developpements = StadeDeveloppements;


(
  async () =>{
    try{
      await  sequelize.authenticate()
      await sequelize.sync();
      console.log('Database connecting ...')

    }
    catch (e){
      console.log(e)
    }
  }
)();



module.exports = db;