const { postToShopify } = require('./utils/postToShopify')

exports.handler = async () => {
  const response = await postToShopify({
    query: `
      mutation createCart($cartInput: CartInput) {
        ...
      }
    `,
    variables: {
      cartInput: {},
    },
  })
}
