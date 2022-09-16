exports.authenticateRoute = async (req, res,next)=>{
    try {
        let token  =  req.headers['Authorization'].split(' ')[1];
        
        const verified = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

        if(verified){
            return res.send("verification reussite");
            next();
        }else{
            // acces refusé
            return res.status(401).send(error);
        }
    } 
    catch (error) {
        // acces refusé
        return res.status(401).send(error);
    }
}