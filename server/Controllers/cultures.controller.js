const db = require("../Models");

const Cultures = db.cultures ;
const Op = db.Sequelize.Op;



// fonction de creation d'une culture
exports.create = (req, res) => {

    const cultures =  req.body;
    console.log(cultures)
    // Verification de l'existance des données dans body
   if (!cultures.nom) {
      return res.status(401).json({
        success: false,
        message: "Le contenu du body est vide"
      });
    }
     // Creation d'un Cultures
     Cultures.create(cultures)
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



// recuperation de tous les Cultures
exports.findAll = (req, res) => {
    //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  //Agriculteurs.findAll({ where: condition })
  Cultures.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
        err.message || "Une erreur est survenue"
      });
    });
};



// recuperation d'une Cultures
exports.findOne = (req, res) => {

    const id = req.params.id;

    Cultures.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json( data);
      } else {
        res.status(404).json({
          success: true,
          message: `Cultures id=${id} introuvable.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "erreur survenue dans la recuperation de la Cultures avec  id=" + id
      });
    });
};




// Mise à jour d'un Cultures
exports.update = (req, res) => {

    const id = req.params.id;

    Cultures.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          success: true,
          message: "Cultures mise à jour avec succes."
        });
      } else {
        res.status(404).json({
          success: true,
          message: `Cultures avec id=${id} introuvable. Verifier que les données ne sont pas vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur dans le processus de mise à jour de la Cultures, id=" + id
      });
    });
};




//Supression d'une Culture
exports.delete = (req, res) => {

    const id = req.params.id;

    Cultures.destroy({
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
          message: `Suppression de la Cultures id=${id} impossible. peut-etre que les données sont vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "Erreur dans le processus de la suppression de la Cultures, id=" + id
      });
    });
};




// Suppresioin de toutes les Cultures
exports.deleteAll = (req, res) => {
    Cultures.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.status(200).json({
            success: true,
            message: `${nums} Cultures supprimés ` });
        })
        .catch(err => {
          res.status(500).json({
            success: true,
            message:
              err.message || "Erreur survenue."
          });
        });
};

