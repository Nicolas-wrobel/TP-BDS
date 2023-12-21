import mongoose from "mongoose";
import express, { json, request, response } from "express";

const app = express();

app.use(json())

mongoose.connect("mongodb://localhost:27017/BDS").then((e) => {
  console.log("Connected")
})
.catch((e) => {
  console.log("failed")
})


const memberSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  pwd: String,
  login: String,
  adresse: {
    numéro: String,
    rue: String,
    ville: String,
    CP: String
  },
  email: String,
  isGerant: Boolean,
  isClient: Boolean
});

const Membre = mongoose.model('Membre', memberSchema);

const groupSchema = new mongoose.Schema({
  numéro: String,
  nom: String,
  ville: String,
  CP: String
});

const Groupe = mongoose.model('Groupe', groupSchema);

const materialSchema = new mongoose.Schema({
  numéro: String,
  marque: String,
  modele: String,
  type: String,
  prix: Number
});

const Materiel = mongoose.model('Materiel', materialSchema);

const orderSchema = new mongoose.Schema({
  NomMembreClient: String,
  NomMembreActif: String,
  date: Date,
  ListeMateriel: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materiel'
  }],
  prix: Number
});

const Commande = mongoose.model('Commande', orderSchema);


app.post("/signUp", (request, response) => {
  Membre.findOne({name : request.body.login, pwd: request.body.pwd})
        .then((member) => {
          // if not still exist
          if(!member) {
              // create and save new member
              const member_to_save = new Membre(request.body);
              member_to_save.save().then(response.json(member));
          }
          else {
              return response.status(403).json({message: 'Sorry, this member already exist'})
          }
      })
})

app.get("/login/:name/:pwd", (request, response) => {
  Membre.findOne({name : request.params.name, pwd: request.params.pwd})
    .then((user) => {
        // if exist
        if(user) {
            response.json(user);
        }
        else {
            return response.status(403).json({message: 'Sorry, bad credentials'})
        }
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
