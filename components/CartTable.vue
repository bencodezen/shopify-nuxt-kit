<script>
import { mapGetters } from 'vuex'
import { formatCurrency } from '../utils/currency'

export default {
  computed: {
    ...mapGetters({
      cartId: 'cart/id',
      cartItems: 'cart/items',
    }),
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
  <table class="cart-table">
    <thead>
      <th class="cart-table-heading">Item</th>
      <th class="cart-table-heading">Price</th>
      <th class="cart-table-heading">Quantity</th>
      <th class="cart-table-heading">Total</th>
      <th class="cart-table-heading">Actions</th>
    </thead>
    <tbody>
      <tr
        v-for="{ node: item } in cartItems"
        :key="item.id"
        class="cart-table-row"
      >
        <td class="cart-table-cell">
          <nuxt-link :to="`/products/${item.merchandise.product.handle}`">
            {{ item.merchandise.product.title }} ({{ item.merchandise.title }})
          </nuxt-link>
        </td>
        <td class="cart-table-cell">
          {{
            formatCurrency(
              item.merchandise.priceV2.amount,
              item.merchandise.priceV2.currencyCode
            )
          }}
        </td>
        <td class="cart-table-cell">{{ item.quantity }}</td>
        <td class="cart-table-cell">
          {{ itemTotal(item.merchandise.priceV2, item.quantity) }}
        </td>
        <td class="cart-table-cell">
          <button @click="removeItem(item.id)">Remove Item</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.cart-table {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.cart-table-cell {
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
}

.cart-table-heading {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.cart-table-row {
  text-align: center;
}
</style>
