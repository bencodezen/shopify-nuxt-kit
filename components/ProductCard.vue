<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    featuredImage() {
      return this.product.images.edges[0].node
    },
    shortDescription() {
      return this.product.description.substring(0, 60) + '...'
    },
  },
}
</script>

<template>
  <div>
    <NuxtLink :to="`/products/${product.handle}`">
      <div class="frame">
        <img
          class="prodimg"
          :src="featuredImage.src"
          :alt="featuredImage.altText"
        />
      </div>
      <h2>{{ product.title }}</h2>
      <p>{{ shortDescription }}</p>
    </NuxtLink>
  </div>
</template>
