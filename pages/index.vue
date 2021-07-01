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
    <main-nav></main-nav>
    <HomeHero />
    <div>
      <ul class="products">
        <li
          v-for="product in productList"
          :key="product.node.id"
          class="product"
        >
          <ProductCard :product="product.node" />
        </li>
      </ul>
    </div>
  </main>
</template>

<style></style>
