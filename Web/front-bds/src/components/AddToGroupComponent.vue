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
export default {
  name: 'AddToGroupComponent',
  data() {
    return {
      groups: [] // Ici, vous chargeriez les groupes existants.
    }
  }
}
</script>