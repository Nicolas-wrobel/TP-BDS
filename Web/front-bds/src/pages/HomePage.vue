<template>
    <div>
      <button @click="logout">Déconnexion</button>
      <add-to-group-component v-if="!isMember"></add-to-group-component>
      <h2 v-else>Vous êtes dans le groupe {{ isMember.nom }} numéro {{ isMember.numero }}.</h2>
      <show-member-component></show-member-component>
      <p><button @click="$router.push('/create-group')">Créer un Groupe</button></p>
      <p><button @click="$router.push('/create-material')">Créer un matériel</button></p>
      <search-orders-component></search-orders-component>
      <create-order-component></create-order-component>
    </div>
  </template>
  
  <script>
  import AddToGroupComponent from '../components/AddToGroupComponent.vue';
  import ShowMemberComponent from '../components/ShowMemberComponent.vue';
  import SearchOrdersComponent from '../components/SearchOrdersComponent.vue';
  import CreateOrderComponent from '@/components/CreateOrderComponent.vue';
  import axios from 'axios';

  export default {
    data() {
      return {
        isMember: false
      };
    },
    components: {
      AddToGroupComponent,
      ShowMemberComponent,
      SearchOrdersComponent,
      CreateOrderComponent
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
    axios.get(`http://127.0.0.1:3000/memberBelongGroup/${localStorage.getItem('isAuthenticated')}`).then(response => {
        if (response.data) {
            this.isMember = response.data
        } else {
            this.isMember = false
        }
    }
  )}
  };
  </script>
  