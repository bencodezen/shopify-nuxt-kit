<script>
export default {
  data: () => ({
    productList: [],
    shoppingCart: 0,
    cart: {},
  }),
  methods: {
    async addToCart() {
      const cartResponse = await fetch('/api/add-to-cart', {
        method: 'POST',
        body: JSON.stringify({
          cartId: this.cartId,
          itemId:
            'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTc0NDA5ODA0MjA2Mg==',
          quantity: 1,
        }),
      })
      const cartData = await cartResponse.json()

      this.$store.dispatch('cart/updateCartId', cartData.id)
    },
  },
  async mounted() {
    const response = await fetch('/api/get-items')
    const data = await response.json()

    this.productList = data.products.edges
  },
}
</script>

<template>
  <div>
    <HomeHero :cart="shoppingCart" />
    <main>
      <ul class="products">
        <li
          v-for="product in productList"
          class="product"
          :key="product.node.id"
        >
          <ProductCard :product="product.node" />
        </li>
      </ul>
    </main>
  </div>
</template>

<style src="@/assets/styles/global.css"></style>
