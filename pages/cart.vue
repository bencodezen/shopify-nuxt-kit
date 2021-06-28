<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cartId: 'cart/id',
      cartItems: 'cart/items',
    }),
  },
}
</script>

<template>
  <div>
    <h1>Test Cart</h1>
    <p>ID: {{ cartId }}</p>
    <table>
      <thead>
        <th>Item</th>
        <th>Quantity</th>
      </thead>
      <tbody>
        <tr v-for="{ node: item } in cartItems" :key="item.id">
          <td>
            {{ item.merchandise.title }}
          </td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <ul></ul>
  </div>
</template>

<style></style>
