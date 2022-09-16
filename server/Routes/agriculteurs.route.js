const agriculteursRouter = require("express").Router()
const agriculteursController = require("../Controllers/agriculteurs.controller.js");
const mdleAuth = require("../middlewares/authenticateRoute")



    agriculteursRouter.post("/", agriculteursController.create);

    agriculteursRouter.post("/auth", agriculteursController.login);
    
    agriculteursRouter.get("/", agriculteursController.findAll);
    
    agriculteursRouter.get("/:id", agriculteursController.findOne);
    
    agriculteursRouter.put("/:id", agriculteursController.update);
    
    agriculteursRouter.delete("/:id", agriculteursController.delete);
    
    agriculteursRouter.delete("/", agriculteursController.deleteAll);
    


module.exports  = agriculteursRouter;


