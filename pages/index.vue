<script>
export default {
  async asyncData({ $http }) {
    const productListResponse = await $http.$post('/api/get-product-list')

    return {
      productList: productListResponse.products.edges,
    }
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
  <main>
    <AppHeader />
    <div class="home-content">
      <StoreGrid :product-list="productList" />
    </div>
    <AppFooter />
  </main>
</template>

<style lang="scss">
.home-content {
  margin: 30px 0;
}
</style>
