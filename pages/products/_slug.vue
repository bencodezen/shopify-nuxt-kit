<script>
import { mapGetters } from 'vuex'

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
    selectedProductId: '',
  }),
  computed: {
    ...mapGetters({
      cartId: 'cart/id',
    }),
    featuredImage() {
      return this.product.images.edges[0].node
    },
    productVariants() {
      return this.product.variants.edges
    },
    selectedProduct() {
      return this.product.variants.edges.find((item) => {
        return item.node.id === this.selectedProductId
      })
    },
  },
  methods: {
    async addToCart() {
      const cartResponse = await this.$http.$post('/api/add-to-cart', {
        cartId: this.cartId,
        itemId: this.selectedProductId,
        quantity: 1,
      })

      this.$store.dispatch('cart/updateBase', cartResponse)
    },
    currency(price) {
      const amount = Number(price.amount).toFixed(2)

      return '$' + amount + ` ${price.currencyCode}`
    },
  },
  mounted() {
    // Set default selected item
    this.selectedProductId = this.productVariants[0].node.id
  },
}
</script>

<template>
  <main>
    <main-nav></main-nav>
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
                v-model="selectedProductId"
                :disabled="variant.quantityAvailable === 0"
              />
              <label :for="variant.id">
                {{ variant.title }} - {{ currency(variant.priceV2) }}
                <span v-if="variant.quantityAvailable > 10">(10+ left)</span>
                <span v-else-if="variant.quantityAvailable > 0">
                  (Only {{ variant.quantityAvailable }} left)
                </span>
                <span v-else> (Bummer. It's sold out!) </span>
              </label>
            </div>
          </div>
          <div v-else>
            {{ currency(productVariants[0].node.priceV2) }}
          </div>
          <input
            type="number"
            name="quantity"
            value="1"
            :max="this.selectedProduct.node.quantityAvailable"
          />
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
