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
  <header>
    <h1>Shoperoni</h1>
    <nav>
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
          <div class="carttotal" v-if="cartSize > 0">{{ cartSize }}</div>
          <nuxt-link to="/cart">Cart</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 0;
}

nav {
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
.carttotal {
  position: absolute;
  border-radius: 1000px;
  background: black;
  color: white;
  font-size: 10px;
  padding: 3px;
  top: -18px;
  right: -20px;
  width: 25px;
  text-align: center;
  height: 25px;
  font-size: 10px;
  padding: 6px 10px;
  font-weight: bold;

  @include breakpoint($deviceMd) {
    right: -18px;
  }
}
</style>
