const db = require("../Models");

const StadeDeveloppements = db.stade_developpements ;
const Op = db.Sequelize.Op;



// fonction de creation d'une culture
exports.create = (req, res) => {

    const stadeDeveloppements =  req.body;
    console.log(stadeDeveloppements)
    // Verification de l'existance des données dans body
   if (!stadeDeveloppements.nom) {
      return res.status(401).json({
        success: false,
        message: "Le contenu du body est vide"
      });
    }
     // Creation d'un StadeDeveloppements
     StadeDeveloppements.create(stadeDeveloppements)
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



// recuperation de tous les StadeDeveloppements
exports.findAll = (req, res) => {
  const title = req.query?.title;
  const condition = title ? { cultureId: {[Op.eq]: parseInt(title)}} : null;
    // StadeDeveloppements.findAll()
  StadeDeveloppements.findAll({ where: condition })
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



// recuperation d'une StadeDeveloppements
exports.findOne = (req, res) => {

    const id = req.params.id;

    StadeDeveloppements.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json( data);
      } else {
        res.status(404).json({
          success: true,
          message: `StadeDeveloppements id=${id} introuvable.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "erreur survenue dans la recuperation de la StadeDeveloppements avec  id=" + id
      });
    });
};




// Mise à jour d'un StadeDeveloppements
exports.update = (req, res) => {

    const id = req.params.id;

    StadeDeveloppements.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          success: true,
          message: "StadeDeveloppements mise à jour avec succes."
        });
      } else {
        res.status(404).json({
          success: true,
          message: `StadeDeveloppements avec id=${id} introuvable. Verifier que les données ne sont pas vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur dans le processus de mise à jour de la StadeDeveloppements, id=" + id
      });
    });
};




//Supression d'une Culture
exports.delete = (req, res) => {

    const id = req.params.id;

    StadeDeveloppements.destroy({
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
          message: `Suppression de la StadeDeveloppements id=${id} impossible. peut-etre que les données sont vides!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: true,
        message: "Erreur dans le processus de la suppression de la StadeDeveloppements, id=" + id
      });
    });
};




// Suppresioin de toutes les StadeDeveloppements
exports.deleteAll = (req, res) => {
    StadeDeveloppements.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.status(200).json({
            success: true,
            message: `${nums} StadeDeveloppements supprimés ` });
        })
        .catch(err => {
          res.status(500).json({
            success: true,
            message:
              err.message || "Erreur survenue."
          });
        });
};

