<script>
import { mapGetters } from 'vuex'
import { formatCurrency } from '../utils/currency'

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
  methods: {
    formatCurrency,
    itemTotal(price, quantity) {
      const totalPrice = Number(price.amount) * Number(quantity)

      return this.formatCurrency(totalPrice, price.currencyCode)
    },
    async removeItem(lineId) {
      const shopifyResponse = await this.$http.$post('/api/remove-from-cart', {
        cartId: this.cartId,
        lineId,
      })

      this.$store.dispatch('cart/updateBase', shopifyResponse)
    },
  },
}
</script>

<template>
  <main class="cart-wrapper">
    <article class="cart-content">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length > 0">
        <table class="cart-table">
          <thead>
            <th class="cart-heading">Item</th>
            <th class="cart-heading">Price</th>
            <th class="cart-heading">Quantity</th>
            <th class="cart-heading">Total</th>
            <th class="cart-heading">Actions</th>
          </thead>
          <tbody>
            <tr
              v-for="{ node: item } in cartItems"
              :key="item.id"
              class="cart-row"
            >
              <td class="cart-row-item">
                <nuxt-link :to="`/products/${item.merchandise.product.handle}`">
                  {{ item.merchandise.product.title }} ({{
                    item.merchandise.title
                  }})
                </nuxt-link>
              </td>
              <td class="cart-row-item">
                {{
                  formatCurrency(
                    item.merchandise.priceV2.amount,
                    item.merchandise.priceV2.currencyCode
                  )
                }}
              </td>
              <td class="cart-row-item">{{ item.quantity }}</td>
              <td class="cart-row-item">
                {{ itemTotal(item.merchandise.priceV2, item.quantity) }}
              </td>
              <td class="cart-row-item">
                <button @click="removeItem(item.id)">Remove Item</button>
              </td>
            </tr>
          </tbody>
        </table>
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

.cart-table {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.cart-item-row {
  text-align: center;
}

.cart-heading {
  padding: 10px 0;
}

.cart-row-item,
.cart-heading {
  border-bottom: 1px solid #ccc;
}
</style>
