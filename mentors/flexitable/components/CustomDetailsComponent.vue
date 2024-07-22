<template>
  <div class="custom-details">
    <p>bu bir detay componenti - {{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomDetailsComponent',
  props: {
    msg: {
      type: String
    }
  }
}
</script>

<style scoped>
.custom-details {
  margin: 0 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 2px dotted #ddd;
  border-radius: 0.5rem;
}
</style>
