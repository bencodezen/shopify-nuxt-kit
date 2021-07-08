<script>
export default {
  async asyncData({ $http, $route }) {
    const productListResponse = await $http.$post('/api/get-product-list')

    return {
      productList: productListResponse.products.edges,
    }
  },
  head: () => ({
    title: 'Shoperoni',
  }),
  computed: {
    filteredProductList() {
      if (this.$route.query.type) {
        return this.productList.filter(
          (product) => product.node.productType === this.$route.query.type
        )
      } else {
        return this.productList
      }
    },
  },
  mounted() {
    // Get local cart
    const localCart = window.localStorage.getItem('shopifyNuxtCart')

    if (localCart) {
      this.$store.dispatch('cart/updateBase', JSON.parse(localCart))
    }
  },
}
</script>

<template>
  <main class="home-wrapper">
    <StoreGrid :product-list="filteredProductList" />
  </main>
</template>

<style lang="scss">
.home-wrapper {
  margin: 45px 0;
}
</style>
