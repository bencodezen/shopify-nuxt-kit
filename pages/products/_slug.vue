<script>
export default {
  data: () => ({
    slug: '',
  }),
  async mounted() {
    console.log(this.$router)
    const postToCart = await fetch('/api/create-cart')
    const postToCartData = await postToCart.json()
    console.log({ postToCartData })
  },
}
</script>

<template>
  <h1>Product Details Page</h1>
</template>

<style></style>
