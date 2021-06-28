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
  <nav class="main-nav">
    <div>
      <nuxt-link to="/" class="nav-item">Home</nuxt-link>
      <nuxt-link to="/cart" class="nav-item">
        Shopping Cart ({{ cartSize }})
      </nuxt-link>
    </div>
  </nav>
</template>

<style>
.main-nav {
  display: flex;
  justify-content: flex-end;
}

.nav-item {
  padding: 10px;
  border: 2px solid #e5eaef;
  border-radius: 10px;
  text-decoration: none;
  color: #e5eaef;
  display: inline-block;
}
</style>
