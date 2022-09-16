const Agriculteurs = require('./agriculteurs.model.js')


module.exports = (sequelize,DataTypes)=>{
    const Cultures = sequelize.define("cultures",{
        
        nom : {type: DataTypes.TEXT, allowNull: false },
        ville : {type: DataTypes.TEXT, allowNull: false},
       
    })

    // definition de la relation qui relie la table Cultures et Agriculteurs
    Agriculteurs.hasMany(Cultures,{
        foreignkey: { name: 'idAgriculteur' , allowNull: false },
    })
    Cultures.belongsTo(Agriculteurs)

    return Cultures

}