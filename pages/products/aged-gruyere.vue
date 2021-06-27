<script>
export default {
  async mounted() {
    const response = await fetch('/api/get-product')
    // const data = await response.json()

    console.log({ response })
  },
}
</script>

<template>
  <h1>Aged Gruyere</h1>
</template>

<style></style>
