<template>
  <div>
    <h1>Add to Group</h1>
    <select>
      <option v-for="group in groups" :key="group.id">{{ group.name }}</option>
    </select>
    <button>Add</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddToGroupComponent',
  data() {
    return {
      groups: [] // Données des groupes
    }
  },
  mounted() {
    // requête pour charger les groupes
    axios.get('url_pour_charger_les_groupes')
      .then(response => {
        this.groups = response.data;
      });
  }
}
</script>