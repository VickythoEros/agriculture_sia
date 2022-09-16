const stadeDeveloppementsRouter = require("express").Router()
const stadeDeveloppementsController = require("../Controllers/stade_developpements.controller");
const mdleAuth = require("../middlewares/authenticateRoute")


    stadeDeveloppementsRouter.post("/", stadeDeveloppementsController.create);
    stadeDeveloppementsRouter.get("/", stadeDeveloppementsController.findAll);
    stadeDeveloppementsRouter.get("/:id", stadeDeveloppementsController.findOne);
    stadeDeveloppementsRouter.put("/:id", stadeDeveloppementsController.update);
    stadeDeveloppementsRouter.delete("/:id", stadeDeveloppementsController.delete);
    stadeDeveloppementsRouter.delete("/", stadeDeveloppementsController.deleteAll);



module.exports  = stadeDeveloppementsRouter;


