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
  <div class="product-card">
    <div class="product-card-frame">
      <NuxtLink :to="`/products/${product.handle}`">
        <img
          class="prodimg"
          :src="featuredImage.src"
          :alt="featuredImage.altText"
        />
      </NuxtLink>
    </div>
    <div class="product-card-text">
      <h3 class="product-card-title">{{ product.title }}</h3>
      <p class="product-card-description">{{ shortDescription }}</p>
    </div>
    <NuxtLink :to="`/products/${product.handle}`">
      <button>View Item ></button>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.product-card-description {
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-card-frame {
  height: 120px;
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

.product-card-text {
  margin: 0.5rem 0;
}

.product-card-title {
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 700;
}
</style>
