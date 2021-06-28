<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      items: 'cart/items',
    }),
    cartSize() {
      return this.items.length
    },
  },
}
</script>

<template>
  <nav>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/cart">Shopping Cart ({{ cartSize }})</nuxt-link>
  </nav>
</template>

<style></style>
