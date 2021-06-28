<script>
export default {
  computed: {
    cartId() {
      return this.$store.state.cart.id
    },
  },
}
</script>

<template>
  <div>
    <h1>Test Cart</h1>
    <p>ID: {{ cartId }}</p>
  </div>
</template>

<style></style>
