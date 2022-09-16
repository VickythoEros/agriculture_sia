
module.exports = (sequelize,DataTypes)=>{
    const Agriculteurs = sequelize.define("agriculteurs",{
        
        nom : {type: DataTypes.TEXT, allowNull: false },
        prenom : {type: DataTypes.TEXT, allowNull: false},
        numero : {type: DataTypes.STRING, allowNull: false,unique: true},
        status : {
            type: DataTypes.ENUM,
            values :['activé',"en attente","supprimé"],
            allowNull: false,
            },

        password : {type: DataTypes.TEXT, allowNull: false},

        nomComplet: {
            type: DataTypes.VIRTUAL,
            get(){
                return `${this.prenom} ${this.nom}`
            },
            set(value){
                throw new Error("le champ nomComplet, n'est pas à renseigner!!!")
            }
        }
    })

    return Agriculteurs

}