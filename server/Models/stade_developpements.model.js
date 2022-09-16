const Cultures = require('./cultures.model.js')


module.exports = (sequelize,DataTypes)=>{
    const StadeDeveloppements = sequelize.define("stadeDeveloppements",{
        
        nom : {type: DataTypes.TEXT, allowNull: false },
        date_oberservation : {type: DataTypes.DATE, allowNull: false},
       
    })

    // definition de la relation qui relie la table Cultures et StadeDeveloppements
    Cultures.hasMany(StadeDeveloppements,{
        foreignkey: { name: 'idCulture' , allowNull: false },
    })
    StadeDeveloppements.belongsTo(Cultures)

    return StadeDeveloppements

}