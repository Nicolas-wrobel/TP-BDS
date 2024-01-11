<template>
    <div>
      <h1>Group Members</h1>
      <ul>
        <li v-for="member in members" :key="member.id">{{ member.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'GroupMembersComponent',
    data() {
      return {
        members: []
      }
    }
  }
  </script>