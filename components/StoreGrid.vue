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
  <div class="storegrid">
    <ProductCard
      v-for="product in productList"
      :key="product.node.id"
      :product="product.node"
    />
  </div>
</template>

<style lang="scss" scoped>
.storegrid {
  max-width: 60vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 0px;
}

.content {
  height: 100%;
  width: 100%;
}
</style>
