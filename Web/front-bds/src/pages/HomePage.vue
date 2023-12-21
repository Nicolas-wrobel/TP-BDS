<template>
    <div>
      <button @click="logout">Déconnexion</button>
      <add-to-group-component></add-to-group-component>
      <create-member-component></create-member-component>
      <show-member-component></show-member-component>
    </div>
  </template>
  
  <script>
  import AddToGroupComponent from '../components/AddToGroupComponent.vue';
  import CreateMemberComponent from '../components/CreateMemberComponent.vue';
  import ShowMemberComponent from '../components/ShowMemberComponent.vue';
  
  export default {
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
  }
  };
  </script>
  