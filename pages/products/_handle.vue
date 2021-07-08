<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $http, route }) {
    const productData = await $http.$post('/api/get-product', {
      itemHandle: route.params.handle,
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
    maxQuantity() {
      if (this.selectedProduct) {
        return this.selectedProduct.node.quantityAvailable
      } else {
        return 0
      }
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
  mounted() {
    // Set default selected item
    this.selectedProductId = this.productVariants[0].node.id

    // Get local cart
    const localCart = window.localStorage.getItem('shopifyNuxtCart')

    if (localCart) {
      this.$store.dispatch('cart/updateBase', JSON.parse(localCart))
    }
  },
  methods: {
    async addToCart() {
      const cartResponse = await this.$http.$post('/api/add-to-cart', {
        cartId: this.cartId,
        itemId: this.selectedProductId,
        quantity: 1,
      })

      this.$store.dispatch('cart/updateBase', cartResponse)
      window.localStorage.setItem('shopifyNuxtCartId', this.cartId)
    },
    currency(price) {
      const amount = Number(price.amount).toFixed(2)

      return '$' + amount + ` ${price.currencyCode}`
    },
  },
}
</script>

<template>
  <main class="product-wrapper">
    <div>
      <section class="item-contain">
        <section class="img">
          <img :src="featuredImage.src" :alt="featuredImage.altText" />
        </section>
        <section class="product-info">
          <h1>{{ product.title }}</h1>
          <h4 class="price">{{ product.price | dollar }}</h4>
          <p>{{ product.description }}</p>
          <form method="POST" @submit.prevent="addToCart">
            <div v-if="productVariants.length > 1">
              <div
                v-for="{ node: variant } in productVariants"
                :key="variant.id"
              >
                <input
                  :id="variant.id"
                  v-model="selectedProductId"
                  type="radio"
                  name="merchandiseId"
                  :value="variant.id"
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
              <span v-if="productVariants[0].node.quantityAvailable > 10">
                (10+ left)
              </span>
              <span v-else-if="productVariants[0].node.quantityAvailable > 0">
                (Only {{ productVariants[0].node.quantityAvailable }} left)
              </span>
              <span v-else> (Bummer. It's sold out!) </span>
            </div>
            <input
              type="number"
              name="quantity"
              value="1"
              min="0"
              :max="maxQuantity"
            />

            <button type="submit" class="button purchase">Add to Cart</button>
          </form>

          <p></p>
        </section>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.product-wrapper {
  margin: 60px 0;
}
.product-variant-item {
  border: 1px solid white;
  padding: 10px;
}

.product-variant-list {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.item-contain {
  margin-top: 30px;
  margin-left: 8%;
  width: 80%;
  display: grid;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 30px;
}

.product-options {
  display: flex;
}

input,
select {
  width: 60px;
  font-size: 25px;
  margin: 0 5px;
  padding: 5px 10px;
}

.update-num {
  background: black;
  border-color: black;
  color: white;
  font-size: 20px;
  width: 45px;
}

.size {
  margin-left: 10px;
}

.size-picker {
  width: 130px;
  font-size: 20px;
  height: 100%;
  border: 0;
  background-color: white;
  outline: 1px solid #ccc;
  outline-offset: -1px;
}

.quantity {
  display: flex;
}

.size-required-message {
  color: red;
}

@media screen and (max-width: 650px) {
  .img img {
    width: 100%;
  }

  .item-contain {
    margin-left: 0 !important;
    width: 95% !important;
  }

  .review {
    width: 90%;
    margin-left: 4%;
  }
}
</style>
