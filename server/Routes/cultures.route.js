const culturesRouter = require("express").Router()
const culturesController = require("../Controllers/cultures.controller.js");
const mdleAuth = require("../middlewares/authenticateRoute")



    culturesRouter.post("/", culturesController.create);
    culturesRouter.get("/", culturesController.findAll);
    culturesRouter.get("/:id", culturesController.findOne);
    culturesRouter.put("/:id", culturesController.update);
    culturesRouter.delete("/:id", culturesController.delete);
    culturesRouter.delete("/", culturesController.deleteAll);

/*
    culturesRouter.post("/:id/"+arrosage_url, culturesController.create);//creer un arrosage pour une  culture
    culturesRouter.get("/:id/"+arrosage_url, culturesController.findAll);//liste arrosage pour une  culture
    culturesRouter.get("/:id/"+arrosage_url+"/:id_arrosage", culturesController.findOne);//recuperer un arrosage pour une  culture
    culturesRouter.put("/:id/"+arrosage_url+"/:id_arrosage", culturesController.update);//mise à jour d'un arrosage pour une  culture
    culturesRouter.delete("/:id/"+arrosage_url+"/:id_arrosage", culturesController.delete);//suppression un arrosage pour une  culture
    culturesRouter.delete("/:id/"+arrosage_url, culturesController.deleteAll);//suppression de la liste des arrosages pour une  culture


    culturesRouter.post("/:id/"+stade_dev_url, culturesController.create);//creer un stade de developpement pour une  culture
    culturesRouter.get("/:id/"+stade_dev_url, culturesController.findAll);//liste stade de developpement pour une  culture
    culturesRouter.get("/:id/"+stade_dev_url+"/:id_stade_dev", culturesController.findOne);//recuperer un stade de developpement pour une  culture
    culturesRouter.put("/:id/"+stade_dev_url+"/:id_arrosage", culturesController.findOne);//mise à jour d'un stade de developpement pour une  culture
    culturesRouter.delete("/:id/"+stade_dev_url+"/:id_stade_dev", culturesController.findOne);//suppression un stade de developpement pour une  culture
    culturesRouter.delete("/:id/"+stade_dev_url, culturesController.findOne);//suppression de la liste des stade de developpement pour une  culture

*/
    

module.exports  = culturesRouter;


