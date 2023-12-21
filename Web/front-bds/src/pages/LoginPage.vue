<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
        login() {
            axios.get(`http://localhost:3000/login/${this.username}/${this.password}`)
            .then(response => {
            if (response.data) {
                localStorage.setItem('isAuthenticated', 'true');
                // Optionnellement stockez d'autres informations utiles (mais pas sensibles)
                this.$router.push('/');
            }
            })
            .catch(error => {
            console.error(error);
            // Gérez l'erreur (affichez un message, etc.)
            });
        }
    }
  };
  </script>
  