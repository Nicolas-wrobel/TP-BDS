<template>
    <div>
      <button @click="logout">Déconnexion</button>
      <add-to-group-component v-if="!isMember"></add-to-group-component>
      <create-member-component></create-member-component>
      <show-member-component></show-member-component>
    </div>
  </template>
  
  <script>
  import AddToGroupComponent from '../components/AddToGroupComponent.vue';
  import CreateMemberComponent from '../components/CreateMemberComponent.vue';
  import ShowMemberComponent from '../components/ShowMemberComponent.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        isMember: false
      };
    },
    components: {
      AddToGroupComponent,
      CreateMemberComponent,
      ShowMemberComponent
    },
    methods: {
    logout() {
      // Supprimer les données de l'utilisateur du localStorage
      localStorage.removeItem('isAuthenticated');
      // Rediriger vers la page de connexion
      this.$router.push('/login');
    }
  },
  created() {
    axios.get(`http://127.0.0.1:3000/memberBelongGroup/${localStorage.getItem('isAuthenticated')}}`).then(response => {
        if (response.data) {
            this.isMember = response.data
        } else {
            this.isMember = false
        }
    }
  )}
  };
  </script>
  