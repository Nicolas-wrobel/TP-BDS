<template>
    <div>
      <h2>Créer une Commande</h2>
      <form @submit.prevent="submitOrder">

        <input type="text" placeholder="Nom du client" v-model="nomMembreClient">
        <div v-if="materiels.length">
            <div v-for="materiel in materiels" :key="materiel._id">
                <input type="checkbox" :value="materiel._id" v-model="selectedMateriels">
                {{ materiel.numéro }} - {{ materiel.marque }} - {{ materiel.modele }} - Prix: {{ materiel.prix }}
            </div>
            <div>Prix total: {{ totalPrice }}</div>
        </div>

        <div v-else>
            No data
        </div>
        <button type="submit">Soumettre la Commande</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        materiels: [],
        selectedMateriels: [],
        nomMembreClient: '',
      };
    },
    computed: {
      totalPrice() {
        return this.materiels.reduce((total, materiel) => {
          if (this.selectedMateriels.includes(materiel._id)) {
            return total + materiel.prix;
          }
          return total;
        }, 0);
      }
    },
    mounted() {
      axios.get('http://localhost:3000/materials')
        .then(response => {
          this.materiels = response.data;
        });
    },
    methods: {
      submitOrder() {
        const selectedMaterials = this.materiels.filter(materiel => 
            this.selectedMateriels.includes(materiel._id)
        );

        const orderData = {
          NomMembreClient: this.nomMembreClient,
          idMembreActif: localStorage.getItem('isAuthenticated'),
          date: new Date(),
          ListeMateriel: selectedMaterials,
          prix: this.totalPrice
        };
        axios.post('http://localhost:3000/order', orderData)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
  };
  </script>
  