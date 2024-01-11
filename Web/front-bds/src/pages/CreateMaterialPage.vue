<template>
  <div>
    <h2>Ajouter un Matériel</h2>
    <form @submit.prevent="submitMaterial">
      <input type="text" placeholder="Numéro" v-model="material.numéro">
      <input type="text" placeholder="Marque" v-model="material.marque">
      <input type="text" placeholder="Modèle" v-model="material.modele">
      <input type="text" placeholder="Type" v-model="material.type">
      <input type="number" placeholder="Prix" v-model.number="material.prix">
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      material: {
        numéro: '',
        marque: '',
        modele: '',
        type: '',
        prix: 0
      }
    };
  },
  methods: {
    submitMaterial() {
      axios.post('http://localhost:3000/material', this.material)
        .then((response) => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
};
</script>
