<script>
import { mapGetters } from 'vuex'

export default {
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
    const shopifyResponse = await this.$http.$post('/api/get-cart', {
      cartId: this.cartId,
    })

    this.$store.dispatch('cart/updateBase', shopifyResponse.cart)
  },
  methods: {
    itemTotal(price, quantity) {
      const totalPrice = Number(price) * Number(quantity)

      return totalPrice.toFixed(2)
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
  <main>
    <main-nav></main-nav>
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
            <td>{{ item.merchandise.priceV2.amount }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              {{ itemTotal(item.merchandise.priceV2.amount, item.quantity) }}
            </td>
            <td>
              <button @click="removeItem(item.id)">Remove Item</button>
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>Subtotal: {{ subtotal.amount }}</li>
        <li>Tax: {{ tax.amount }}</li>
        <li>Total: {{ total.amount }}</li>
      </ul>
    </div>
    <p v-else>Your cart is empty, fill it up!</p>
    <nuxt-link to="/">Back Home</nuxt-link>
  </main>
</template>

<style></style>
