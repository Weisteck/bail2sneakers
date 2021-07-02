const mongoose = require("mongoose");
const config   = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGOURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log("Le serveur n'est pas parvenu à se connecter à la BDD.", err));
};

module.exports = connectDB;
