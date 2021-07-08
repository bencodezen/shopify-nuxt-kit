<template>
  <footer>
    <section class="callout">
      <h2>
        "The interplay of flavors between the cheese, meats and fruits is an
        absolute delight."
      </h2>
      <p>Paul Hotcakes</p>
    </section>
    <app-footer-links />
    <div class="sarahstuff">
      <p>
        This project is
        <a href="https://github.com/bencodezen/shopify-nuxt">
          open source on GitHub </a
        >, hosted with <a href="https://bit.ly/2G29YwK">Netlify</a>, built with
        <a href="https://nuxtjs.org/">Nuxt</a> and made with 💚 by Ben Hong (<a
          href="https://twitter.com/bencodezen"
          >@bencodezen</a
        >)
      </p>
    </div>
  </footer>
</template>

<script>
import AppFooterLinks from '~/components/AppFooterLinks.vue'
export default {
  components: {
    AppFooterLinks,
  },
}
</script>

<style lang="scss" scoped>
.callout {
  width: 100%;
  height: 280px;
  background: url('/images/callout.jpg') center center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  h2 {
    padding: 0 30px;
    text-align: center;
  }
}
.sarahstuff {
  background: black;
  width: 100%;
  padding: 10px 30px;
  color: white;
  text-align: center;
}
a,
a:visited,
a:active {
  color: #c4c3ec;
  font-weight: bold;
}
</style>
