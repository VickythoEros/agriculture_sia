const arrosagesRouter = require("express").Router()
const arrosagesController = require("../Controllers/arrosages.controller.js");
const mdleAuth = require("../middlewares/authenticateRoute")


    arrosagesRouter.post("/", arrosagesController.create);
    arrosagesRouter.get("/", arrosagesController.findAll);
    arrosagesRouter.get("/:id", arrosagesController.findOne);
    arrosagesRouter.put("/:id", arrosagesController.update);
    arrosagesRouter.delete("/:id", arrosagesController.delete);
    arrosagesRouter.delete("/", arrosagesController.deleteAll);


module.exports  = arrosagesRouter;


