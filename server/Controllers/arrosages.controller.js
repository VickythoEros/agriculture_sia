const db = require("../Models");

const Arrosages = db.arrosages ;
const Op = db.Sequelize.Op;
const sse = require("../serverSideEvent");


// fonction de creation d'une culture
exports.create = (req, res) => {

    const arrosages =  req.body;
    console.log(arrosages)
    // Verification de l'existance des données dans body
   if (!arrosages.quantite_eau) {
      return res.status(401).json({
        success: false,
        message: "Le contenu du body est vide"
      });
    }
    let dataArrosage = {
      quantite_eau:arrosages.quantite_eau,
      date: new Date()
    }
     // Creation d'un Arrosages
     Arrosages.create(dataArrosage)
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
    

};



// recuperation de tous les Arrosages
exports.findAll = (req, res) => {
  Arrosages.findAll({  order: [['createdAt', 'DESC']]})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Une erreur est survenue"
      });
    });
};



// recuperation d'une Arrosages
exports.findOne = (req, res) => {

    const id = req.params.id;

    Arrosages.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json({
          success: true,
          message: data
        });
      } else {
        res.status(404).json({
          success: true,
          message: `Arrosages id=${id} introuvable.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "erreur survenue dans la recuperation de la Arrosages avec  id=" + id
      });
    });
};




// Mise à jour d'un Arrosages
exports.update = (req, res) => {

    const id = req.params.id;

    Arrosages.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          success: true,
          message: "Arrosages mise à jour avec succes."
        });
      } else {
        res.status(404).json({
          success: true,
          message: `Arrosages avec id=${id} introuvable. Verifier que les données ne sont pas vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur dans le processus de mise à jour de la Arrosages, id=" + id
      });
    });
};




//Supression d'une Culture
exports.delete = (req, res) => {

    const id = req.params.id;

    Arrosages.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          success: true,
          message: "Suppresion effectuée avec succes!"
        });
      } else {
        res.status(404).json({
          success: true,
          message: `Suppression de la Arrosages id=${id} impossible. peut-etre que les données sont vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "Erreur dans le processus de la suppression de la Arrosages, id=" + id
      });
    });
};




// Suppresioin de toutes les Arrosages
exports.deleteAll = (req, res) => {
    Arrosages.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.status(200).json({
            success: true,
            message: `${nums} Arrosages supprimés ` });
        })
        .catch(err => {
          res.status(500).json({
            success: true,
            message:
              err.message || "Erreur survenue."
          });
        });
};

