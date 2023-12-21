<template>
    <div>
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
    }
  };
  </script>
  