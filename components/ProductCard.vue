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
  <div class="product">
    <div class="product-frame">
      <NuxtLink :to="`/products/${product.handle}`">
        <img
          class="prodimg"
          :src="featuredImage.src"
          :alt="featuredImage.altText"
        />
      </NuxtLink>
    </div>
    <div class="product-text">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ shortDescription }}</p>
    </div>
    <NuxtLink :to="`/products/${product.handle}`">
      <button class="multi-item">View Item ></button>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.product {
  max-height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
}

.product-description {
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-frame {
  height: 120px;
  margin-bottom: 0.5rem;
  display: flex;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    height: 100%;
  }
}

.product-text {
  margin: 0.5rem 0;
}

.product-title {
  margin: 0.5rem 0;
  font-weight: 700;
}
</style>
