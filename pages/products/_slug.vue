<script>
export default {
  async asyncData({ $http, route }) {
    const productData = await $http.$post('/api/get-product', {
      itemHandle: route.params.slug,
    })

    return {
      product: productData.productByHandle,
    }
  },
  data: () => ({
    selectedProduct: '',
  }),
  computed: {
    featuredImage() {
      return this.product.images.edges[0].node
    },
    productVariants() {
      return this.product.variants.edges
    },
  },
  methods: {
    async addToCart() {
      const cartResponse = await this.$http.$post('/api/add-to-cart', {
        itemId: this.selectedProduct,
        quantity: 1,
      })

      console.log({ cartResponse })
    },
    currency(price) {
      const amount = Number(price.amount).toFixed(2)

      return '$' + amount + price.currencyCode
    },
  },
  mounted() {
    // Set default selected item
    this.selectedProduct = this.productVariants[0].node.id
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
        <form method="POST" @submit.prevent="addToCart">
          <div v-if="productVariants.length > 1">
            <div v-for="{ node: variant } in productVariants" :key="variant.id">
              <input
                type="radio"
                :id="variant.id"
                name="merchandiseId"
                :value="variant.id"
                v-model="selectedProduct"
              />
              <label :for="variant.id">
                {{ variant.title }} - {{ currency(variant.priceV2) }}
              </label>
            </div>
          </div>
          <div v-else>
            {{ product.variants.edges[0].node.priceV2.currencyCode }}
            {{ product.variants.edges[0].node.priceV2.amount }}
          </div>
          <input type="number" name="quantity" value="1" />
          <input type="hidden" name="cartId" value="" />
          <input type="submit" value="Add to basket" />
        </form>
      </div>
    </div>
  </main>
</template>

<style>
.product-variant-item {
  border: 1px solid white;
  padding: 10px;
}

.product-variant-list {
  display: flex;
  list-style-type: none;
  padding: 0;
}
</style>
