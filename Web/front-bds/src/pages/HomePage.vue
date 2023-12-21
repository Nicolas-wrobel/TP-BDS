<template>
    <div class="login-container">
      <h1>Connexion</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  /* CSS ici */
  </style>
  