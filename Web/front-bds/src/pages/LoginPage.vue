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
  /* Votre CSS ici */
  </style>
  