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
  numero: String,
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

app.post("/addMemberToGroup/:id", async (request, response) => {
  try {
    const groupId = request.params.id;
    const memberId = request.body.memberId;

    const member = await Membre.findById(memberId);
    if (!member) {
      return response.status(404).json({ message: "Member not found" });
    }

    const updatedGroup = await Groupe.findByIdAndUpdate(
      groupId, 
      { $push: { membre: member._id } },
      { new: true }
    );

    if (!updatedGroup) {
      return response.status(404).json({ message: "Group not found" });
    }

    response.json(updatedGroup);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An error occurred" });
  }
});

app.post("/group", (request, response) => {
  console.log(request.body)
  const groupToSave = new Groupe(request.body);
  groupToSave.save().then(response.json("Group added"));
})

app.get("/groups", (request, response) => {
  Groupe.find().then((groups) => {
    response.json(groups);
    })
})

app.post("/material", (request, response) => {
  const materialToSave = new Materiel(request.body);
  materialToSave.save().then(response.json("Material added"));
})

app.get("/materials", (request, response) => {
  Materiel.find().then((materials) => {
    response.json(materials);
    })
})

app.post("/order", async (request, response) => {
  const memberId = request.body.idMembreActif;
  const member = await Membre.findById(memberId);
    if (!member) {
      return response.status(404).json({ message: "Member not found" });
    }
  const commande = {
    "NomMembreClient" : request.body.NomMembreClient,
    "NomMembreActif" : member.nom,
    "date" : request.body.date,
    "ListeMateriel" : request.body.ListeMateriel,
    "prix" : request.body.prix
  };
  const OrderToSave = new Commande(commande);
  OrderToSave.save().then(response.json("Order created"));
})


app.get("/memberBelongGroup/:id", async (request, response) => {
  try {
    const memberId = request.params.id;

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

app.get('/recherche/date/:dateDebut/:dateFin', (request, response) => {
  Commande.find({
      date: { $gte: new Date(request.params.dateDebut), $lte: new Date(request.params.dateFin) }
  })
  .then(commandes => response.json(commandes))
  .catch(err => response.status(500).json(err));
});

app.get('/recherche/membreActifParNom/:nom', (request, response) => {
  Commande.find({ NomMembreActif: new RegExp(request.params.nom, 'i') })
  .then(membres => response.json(membres))
  .catch(err => response.status(500).json(err));
});

app.get('/recherche/membreClientParNom/:nom', (request, response) => {
  Commande.find({ NomMembreClient: new RegExp(request.params.nom, 'i') })
  .then(membres => response.json(membres))
  .catch(err => response.status(500).json(err));
});

app.get('/recherche/materielParNom/:nom', (request, response) => {
  Materiel.find({ nom: new RegExp(request.params.nom, 'i') })
  .then(materiels => response.json(materiels))
  .catch(err => response.status(500).json(err));
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
