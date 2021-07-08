<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cartSize: 'cart/size',
    }),
  },
}
</script>

<template>
  <header class="app-header">
    <h1>Shoperoni</h1>
    <nav class="main-nav">
      <ul>
        <li class="main-nav-item">
          <nuxt-link exact to="/">All</nuxt-link>
        </li>
        <li class="main-nav-item">
          <nuxt-link to="/?type=cheese">Cheeses</nuxt-link>
        </li>
        <li class="main-nav-item">
          <nuxt-link to="/?type=meat">Meats</nuxt-link>
        </li>
        <li class="main-nav-item">
          <nuxt-link to="/?type=boards">Boards</nuxt-link>
        </li>
        <li class="main-nav-item">
          <div v-if="cartSize > 0" class="cart-size">{{ cartSize }}</div>
          <nuxt-link to="/cart">Cart</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 0;
}

.main-nav {
  display: flex;
  width: 80vw;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;

  ul {
    padding-left: 0;
  }
}

.main-nav-item {
  position: relative;
  display: inline;
  padding: 0 3px;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @include breakpoint($deviceXs) {
    padding: 0 8px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 0.7rem;
  }

  @include breakpoint($deviceSm) {
    padding: 0 10px;
    font-size: 0.8rem;
  }

  a {
    color: black;
    &:hover {
      color: $brandprimary;
    }
  }
}
.cart-size {
  position: absolute;
  top: -18px;
  right: -20px;
  width: 25px;
  height: 25px;
  padding: 6px 10px;
  border-radius: 1000px;
  background: black;
  text-align: center;
  color: white;
  font-size: 10px;
  font-weight: bold;

  @include breakpoint($deviceMd) {
    right: -18px;
  }
}
</style>
