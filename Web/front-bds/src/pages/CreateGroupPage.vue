<template>
    <div class="create-group-container">
      <h1>Créer un Groupe</h1>
      <form @submit.prevent="createGroup">
        <input type="text" placeholder="Numéro" v-model="numero">
        <input type="text" placeholder="Nom" v-model="nom">
        <input type="text" placeholder="Ville" v-model="ville">
        <input type="text" placeholder="Code Postal" v-model="CP">
        <button type="submit">Créer le Groupe</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        numero: '',
        nom: '',
        ville: '',
        CP: ''
      };
    },
    methods: {
      createGroup() {
        const groupData = {
          numero: this.numero,
          nom: this.nom,
          ville: this.ville,
          CP: this.CP,
          membre: []
        };
  
        axios.post('http://localhost:3000/group', groupData)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  