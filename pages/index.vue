<script>
export default {
  data: () => ({
    productList: [],
  }),
  async mounted() {
    const response = await fetch('/.netlify/functions/get-items')
    const data = await response.json()

    this.productList = data
  },
}
</script>

<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">shopify-nuxt</h1>
      <ul>
        <li v-for="product in productList" :key="product.node.id">
          <img
            :src="product.node.images.edges[0].node.src"
            alt=""
            style="max-width: 200px"
          />
          <h3>{{ product.node.title }}</h3>
          <p>{{ product.node.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
