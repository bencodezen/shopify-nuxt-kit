<script>
export default {
  data: () => ({
    product: {},
  }),
  computed: {
    featuredImage() {
      if (this.product.images && this.product.images.edges) {
        return this.product.images.edges[0].node
      } else {
        return 'No image found'
      }
    },
  },
  async created() {
    const productData = await fetch('/api/get-product', {
      method: 'POST',
      body: JSON.stringify({
        itemHandle: this.$route.params.slug,
      }),
    }).then((res) => res.json())

    this.product = productData.productByHandle
  },
}
</script>

<template>
  <main>
    <HomeHero />
    <div class="product-page">
      <div class="product-img">
        <img :src="featuredImage.src" :alt="featuredImage.altText" />
      </div>
      <div class="product-copy">
        <h1>{{ product.title }}</h1>
        <p>
          {{ product.description }}
        </p>
        <button>Add to Cart</button>
      </div>
    </div>
  </main>
</template>

<style></style>
