<template>
    <div>
      <h2>Recherche de Commandes</h2>
      
      <div>
        <input type="date" v-model="dateDebut">
        <input type="date" v-model="dateFin">
        <button @click="rechercheParDate">Rechercher par Date</button>
      </div>
  
      <div>
        <input type="text" v-model="membreClient">
        <button @click="rechercheParMembreClient">Rechercher par Membre client</button>
      </div>

      <div>
        <input type="text" v-model="membreActif">
        <button @click="rechercheParMembreActif">Rechercher par Membre actif</button>
      </div>

      <div>
        <input type="text" v-model="materiel">
        <button @click="rechercheParMateriel">Rechercher par Matériel</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dateDebut: '',
        dateFin: '',
        dateResults: null,
        membreClient: '',
        membreClientResults: null,
        membreActif: '',
        membreActifResults: null,
        materiel: '',
        materielResults: null,
      };
    },
    methods: {
      rechercheParDate() {
        axios.get(`http://localhost:3000/recherche/date/${this.dateDebut}/${this.dateFin}`)
          .then(response => {
            this.dateResults = response.data
            console.log(this.dateResults)
          })
          .catch(error => {
            console.error(error);
          });
      },

      rechercheParMembreClient() {
        axios.get(`http://localhost:3000/recherche/membreClientParNom/${this.membreClient}`)
          .then(response => {
            this.membreClientResults = response.data
            console.log(this.membreClientResults)
          })
          .catch(error => {
            console.error(error);
          });
      },

      rechercheParMembreActif() {
        axios.get(`http://localhost:3000/recherche/membreActifParNom/${this.membreActif}`)
          .then(response => {
            this.membreActifResults = response.data
            console.log(this.membreActifResults)
          })
          .catch(error => {
            console.error(error);
          });
      },

      rechercheParMateriel() {
        axios.get(`http://localhost:3000/recherche/materielParNom/${this.materiel}`)
          .then(response => {
            this.materielResults = response.data
            console.log(this.materielResults)
          })
          .catch(error => {
            console.error(error);
          });
      },
    }
  };
  </script>
  