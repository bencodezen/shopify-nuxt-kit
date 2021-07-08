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
  methods: {
    currency(price) {
      const amount = Number(price.amount).toFixed(2)

      return '$' + amount + ` ${price.currencyCode}`
    },
    itemTotal(price, quantity) {
      const totalPrice = Number(price.amount) * Number(quantity)

      return this.currency({
        amount: totalPrice,
        currencyCode: price.currencyCode,
      })
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
        <table>
          <thead>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="{ node: item } in cartItems" :key="item.id">
              <td>
                <nuxt-link :to="`/products/${item.merchandise.product.handle}`">
                  {{ item.merchandise.product.title }} ({{
                    item.merchandise.title
                  }})
                </nuxt-link>
              </td>
              <td>{{ currency(item.merchandise.priceV2) }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                {{ itemTotal(item.merchandise.priceV2, item.quantity) }}
              </td>
              <td>
                <button @click="removeItem(item.id)">Remove Item</button>
              </td>
            </tr>
          </tbody>
        </table>
        <section class="payment">
          <div></div>
          <div class="total">
            <div class="caption">
              <p>
                <strong>Subtotal:</strong>
              </p>
              <p>Shipping:</p>
              <p>Tax:</p>
              <p class="golden">Total:</p>
            </div>
            <div class="num">
              <p>
                <strong>{{ currency(subtotal) }}</strong>
              </p>
              <p>Free Shipping</p>
              <p>{{ currency(tax) }}</p>
              <p class="golden">{{ currency(total) }}</p>
            </div>
          </div>
        </section>
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

table {
  width: 100%;
  margin-top: 20px;
}

tr {
  text-align: center;
}

th {
  padding: 10px 0;
}

td,
th {
  border-bottom: 1px solid #ccc;
}

.num p,
.caption p {
  padding-left: 10px;
}

.golden {
  background: #f2eee2;
  font-weight: bold;
  padding: 10px;
}

.payment {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 100px;
}

.total {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
