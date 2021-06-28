<script>
export default {
  data: () => ({
    slug: '',
  }),
  // async mounted() {
  //   console.log(this.$router)
  //   const postToCart = await fetch('/api/create-cart')
  //   const postToCartData = await postToCart.json()
  //   console.log({ postToCartData })
  // },
}
</script>

<template>
  <div>
    <HomeHero />
    <main class="product-page">
      <div class="product-img">
        <img
          src="https://cdn.shopify.com/s/files/1/0578/9866/4142/products/brooke-lark-M4E7X3z80PQ-unsplash_1.jpg?v=1624502185"
        />
      </div>
      <div class="product-copy">
        <h1>Berry Good Charcuterie</h1>
        <p>
          Minim palo santo polaroid kinfolk farm-to-table brooklyn cornhole lyft
          velit mollit neutra bicycle rights keffiyeh la croix. Af hexagon
          occaecat, umami sustainable cliche chicharrones XOXO pinterest
          succulents copper mug.
        </p>
        <button>Add to Cart</button>
      </div>
    </main>
  </div>
</template>

<style></style>
