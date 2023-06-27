# Shopify Nuxt Kit

A starter template kit for those looking to use [Shopify](https://www.shopify.com)'s new Cart API with Nuxt 2 on [Netlify](https://www.netlify.com).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bencodezen/shopify-nuxt-kit)

## Configuration

You need to set the following environment variables in your Netlify dashboard:

- `SHOPIFY_API_ENDPOINT`: Example `https://example.myshopify.com/api/unstable/graphql.json`
- `SHOPIFY_STOREFRONT_API_TOKEN`: Example `asdfj8fjhd83js83dhdhs8s`

## Build Setup

_**Prerequisite**: [Netlify CLI](https://docs.netlify.com/cli/get-started/) and [Node 16](https://nodejs.org/en/)_

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8888
$ ntl dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Credit

Big hat tip to [Sarah's Netlify E-commerce Site](https://github.com/sdras/ecommerce-netlify/) which served as a big inspiration for the current design.
