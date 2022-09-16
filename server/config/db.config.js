module.exports = {
    HOST: "127.0.0.1", // l' host
    USER: "vickytho", // utilisateur de la base de donnée
    PASSWORD: 'Vickyth@5779', // le mot de passe d'acces à la base de donnée
    DB: "diane_project_DB", // le nom de la base de donnée
    dialect: "mysql", // le type de base de donnée
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };