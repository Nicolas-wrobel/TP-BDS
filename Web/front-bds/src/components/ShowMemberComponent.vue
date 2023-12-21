<template>
    <div>
      <h1>Group Members</h1>
      <ul>
        <li v-for="member in members" :key="member.id">{{ member.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GroupMembersComponent',
    data() {
      return {
        members: [] // Ici, les membres du groupe sélectionné sont affichés.
      }
    }
  }
  </script>