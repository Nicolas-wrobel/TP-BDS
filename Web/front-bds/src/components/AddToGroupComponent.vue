<template>
  <div>
    <h1>Add to Group</h1>
    <select v-model="selectedGroupId">
      <option v-for="group in groups" :key="group._id" :value="group._id">
        {{ group.nom }}
      </option>
    </select>
    <button @click="addToGroup">Add</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AddToGroupComponent',
  data() {
    return {
      groups: [],
      selectedGroupId: null
    }
  },
  mounted() {
    axios.get('http://localhost:3000/groups')
      .then(response => {
        this.groups = response.data;
      });
  },
  methods: {
    addToGroup() {
      if (this.selectedGroupId) {
        console.log(this.selectedGroupId)
        console.log(localStorage.getItem('isAuthenticated'))
        axios.post(`http://localhost:3000/addMemberToGroup/${this.selectedGroupId}`, { memberId: localStorage.getItem('isAuthenticated') })
        .then(response => {
          this.groups = response.data;
        })
        .catch(error => {
          console.log(error)
        });
      }  else {
        console.error("No group selected");
      }
    }
  }
}
</script>