<template>
    <div class="signup-container">
      <h1>Inscription</h1>
      <form @submit.prevent="signup">
        <input type="text" placeholder="Nom" v-model="nom">
        <input type="text" placeholder="Prénom" v-model="prenom">
        <input type="email" placeholder="Email" v-model="email">
        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Mot de passe" v-model="pwd">
        
        <div>
          <input type="text" placeholder="Numéro" v-model="adresse.numéro">
          <input type="text" placeholder="Rue" v-model="adresse.rue">
          <input type="text" placeholder="Ville" v-model="adresse.ville">
          <input type="text" placeholder="Code Postal" v-model="adresse.CP">
        </div>
  
        <input type="checkbox" id="isClient" v-model="isClient">
        <label for="isClient">Est Client</label>
  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nom: '',
        prenom: '',
        email: '',
        login: '',
        pwd: '',
        adresse: {
          numéro: '',
          rue: '',
          ville: '',
          CP: ''
        },
        isGerant: false,
        isClient: false
      };
    },
    methods: {
      signup() {
        axios.post('http://localhost:3000/signUp', this.$data)
          .then(response => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>