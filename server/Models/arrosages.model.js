const Cultures = require('./cultures.model.js')


module.exports = (sequelize,DataTypes)=>{
    const Arrosages = sequelize.define("arrosages",{
        
        quantite_eau : {type: DataTypes.STRING, allowNull: false },
        date : {type: DataTypes.DATE, allowNull: false},
       
    })

    // definition de la relation qui relie la table Cultures et Arrosages
    Cultures.hasMany(Arrosages,{
        foreignkey: { name: 'idCulture' , allowNull: false },
    })
    Arrosages.belongsTo(Cultures)

    return Arrosages

}