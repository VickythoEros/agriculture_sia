const db = require("../Models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const Agriculteurs = db.agriculteurs ;
const Op = db.Sequelize.Op;


//process.env.SECRET_KEY_TOKEN

exports.login = async(req, res, next)=>{
    const body =  req.body;

    const agriculteur = await Agriculteurs.findOne({where: {numero:body.numero}});
    if(agriculteur){
      const password_valid = await bcrypt.compare(body.password,agriculteur.password);
      
      if(password_valid){

        const token =  jwt.sign({"userId":agriculteur.numero,"time": Date()},'_b@njoUr&& L@ f@mill3 t@to)')
        res.status(200).json( {
            success: true,
            token : token,
            userId: agriculteur.numero
          
          });

      }
      else{

        res.status(401).json({
          success: true,
          message: "mot de passe incorrect"
        })
      }

    }
    else{
      res.status(404).json({
        success: true,
        message: "agriculteur introuvable"
      })
    }
}



// fonction de creation d'un agriculteurs
exports.create = (req, res) => {

    const agriculteur =  req.body;
    console.log(agriculteur)
    // Verification de l'existance des données dans body
   if (!agriculteur.numero) {
      return res.status(401).json({
        success: false,
        message: "Le contenu du body est vide"
      });
    }

    // hasher le mot de passe
    bcrypt.hash(agriculteur.password,10)
      .then( hash =>{
        
        const agriculteurContent = {
          ...agriculteur,
          password : hash
        }

        // Creation d'un Agriculteur
        Agriculteurs.create(agriculteurContent)
          .then(data => {
            return res.status(200).json({
              success: true,
              message: data
            });
          })
          .catch(err => {
            return res.status(500).json({
              success: false,
              message:  err || "Une erreur est survenue"
            });
          });


      })
      .catch(err =>{
        return res.status(500).json({
          success: false,
          message: err
        });
      })

    

};



// recuperation de tous les agriculteurs
exports.findAll = (req, res) => {
    //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  //Agriculteurs.findAll({ where: condition })
  Agriculteurs.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Une erreur est survenue"
      });
    });
};



// recuperation d'un agriculteur
exports.findOne = (req, res) => {

    const id = req.params.id;

    Agriculteurs.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Agriculteurs id=${id} introuvable.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur survenue dans la recuperation de l'agriculteur avec  id=" + id
      });
    });
};




// Mise à jour d'un agriculteur
exports.update = (req, res) => {

    const id = req.params.id;

    Agriculteurs.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Agriculteur mise à jour avec succes."
        });
      } else {
        res.status(404).send({
          message: `Agriculteur avec id=${id} introuvable. Verifier que les données ne sont pas vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur dans le processus de mise à jour de l'agriculteur, id=" + id
      });
    });
};




//Supression d'un agriculteur
exports.delete = (req, res) => {

    const id = req.params.id;

    Agriculteurs.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Suppresion effectuée avec succes!"
        });
      } else {
        res.status(404).send({
          message: `Suppression de l'agriculteur id=${id} impossible. peut-etre que les données sont vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur dans le processus de la suppression de l'agriculteur, id=" + id
      });
    });
};




// Suppresioin de tous les agriculteurs
exports.deleteAll = (req, res) => {
    Agriculteurs.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.status(200).send({ message: `${nums} Agriculteurs supprimés ` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Erreur survenue."
          });
        });
};

