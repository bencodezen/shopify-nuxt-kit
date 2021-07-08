<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      subtotal: 'cart/subtotal',
      tax: 'cart/tax',
      total: 'cart/total',
    }),
  },
}
</script>

<template>
  <section class="cart-total">
    <div class="cart-total-content">
      <div class="cart-total-column">
        <p>
          <strong>Subtotal:</strong>
        </p>
        <p>Shipping:</p>
        <p>Tax:</p>
        <p>Total:</p>
      </div>
      <div class="cart-total-column">
        <p>
          <strong>{{ subtotal }}</strong>
        </p>
        <p>Free Shipping</p>
        <p>{{ tax }}</p>
        <p>{{ total }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cart-total {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.cart-total-content {
  grid-column: 1 / span 5;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @include breakpoint($deviceLg) {
    grid-column: 4 / span 2;
  }
}

.cart-total-column p {
  padding: 10px;
  margin: 0;
  text-align: right;

  &:last-child {
    font-weight: bold;
    background: #f2eee2;
  }
}
</style>
