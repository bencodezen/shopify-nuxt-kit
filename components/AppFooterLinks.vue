<template>
  <section class="app-footer-links">
    <ul>
      <li>About</li>
      <li>Company</li>
      <li>Locations</li>
      <li>Contact</li>
      <li>Hours</li>
    </ul>
    <ul>
      <li>Twitter</li>
      <li>Facebook</li>
      <li>Instagram</li>
      <li>LinkedIn</li>
    </ul>
    <div class="newsletter">
      <h2 class="newsletter-title">Sign up for our newsletter:</h2>
      <input
        class="newsletter-input"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-footer-links {
  width: 80%;
  padding: 40px 0;
  margin-left: 10%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 30px;

  @include breakpoint($deviceLg) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr;
    grid-row-gap: 0;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
}

.newsletter {
  width: 100%;
  grid-column: 1 / span 2;

  @include breakpoint($deviceLg) {
    grid-column: 3;
  }
}

.newsletter-title {
  margin-bottom: 1rem;
}

.newsletter-input {
  width: 100%;
  padding: 10px;
}
</style>
