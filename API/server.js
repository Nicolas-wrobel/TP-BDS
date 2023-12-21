import mongoose from "mongoose";
import cors from 'cors';
import express, { json, request, response } from "express";

const app = express();

app.use(cors())
app.use(json())

mongoose.connect("mongodb://127.0.0.1:27017/BDS").then((e) => {
  console.log("Connected")
})
.catch((e) => {
  console.log("Failed to connect to MongoDB", e);
});


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
  membre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membre' }],
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

app.post("addMemberToGroup/:id", (request, response) => {
  Groupe.findById(request.params.id).then((group) => {
      group.membre.push(request.body);
      Groupe.findByIdAndUpdate(request.params.id, group);
    }
  )
})

app.post("group", (request, response) => {
  const groupToSave = new Groupe(request.body);
  groupToSave.save().then(response.json("Group added"));
})

app.get("groups", (request, response) => {
  Groupe.find().then((groups) => {
    response.json(groups);
    })
})

app.post("material", (request, response) => {
  const materialToSave = new Materiel(request.body);
  materialToSave.save().then(response.json("Material added"));
})

app.get("memberBelongGroup/:id", async (request, response) => {
  try {
    const memberId = req.params.id;

    const isMemberInGroup = await Groupe.findOne({ membre: memberId });
    if (isMemberInGroup) {
      response.json(isMemberInGroup);
    } else {
      response.json(false);
    }
  } catch (error) {
    response.status(500).send("Erreur lors de la vérification de l'appartenance du membre");
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
