<script>
export default {
  props: {
    productList: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="product-grid">
    <ProductCard
      v-for="product in productList"
      :key="product.node.id"
      :product="product.node"
    />
  </div>
</template>

<style lang="scss" scoped>
.product-grid {
  max-width: 60vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;

  @include breakpoint($deviceSm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint($deviceLg) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include breakpoint($deviceXl) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
