<template>
    <div class="create-group-container">
      <h1>Créer un Groupe</h1>
      <form @submit.prevent="createGroup">
        <input type="text" placeholder="Numéro" v-model="numéro">
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
        numéro: '',
        nom: '',
        ville: '',
        CP: ''
      };
    },
    methods: {
      createGroup() {
        const groupData = {
          numéro: this.numéro,
          nom: this.nom,
          ville: this.ville,
          CP: this.CP,
          membre: []
        };
  
        axios.post('http://127.0.0.1:3000/group', groupData)
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
  