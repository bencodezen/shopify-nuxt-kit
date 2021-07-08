<script>
import { mapGetters } from 'vuex'

export default {
  head: () => ({
    title: 'Shoperoni - Cart',
  }),
  computed: {
    ...mapGetters({
      cartId: 'cart/id',
      cartItems: 'cart/items',
      subtotal: 'cart/subtotal',
      tax: 'cart/tax',
      total: 'cart/total',
    }),
  },
  async mounted() {
    // Get local cart id
    const localCart = window.localStorage.getItem('shopifyNuxtCart')

    if (localCart) {
      this.$store.dispatch('cart/updateBase', JSON.parse(localCart))
    } else {
      const shopifyResponse = await this.$http.$post('/api/get-cart', {
        cartId: this.cartId,
      })

      if (shopifyResponse) {
        this.$store.dispatch('cart/updateBase', shopifyResponse.cart)
      }
    }
  },
}
</script>

<template>
  <main class="cart-wrapper">
    <article class="cart-content">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <cart-table />
        <cart-total :subtotal="subtotal" :tax="tax" :total="total"></cart-total>
      </div>
      <section v-else>
        <p class="cart-empty-message">Your cart is empty, fill it up!</p>
        <nuxt-link to="/" class="button is-dark">Back to Products</nuxt-link>
      </section>
    </article>
  </main>
</template>

<style lang="scss">
.button.is-dark {
  background: #222;
  color: #f8f8f8;
  padding: 10px 14px;
  display: inline-block;
}

.cart-content {
  margin: 2rem 0 3rem;
  text-align: center;
}

.cart-empty-message {
  margin-bottom: 1.5rem;
}

.cart-wrapper {
  width: 80vw;
  margin: 0 auto;
}
</style>
