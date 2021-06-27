const { postToShopify } = require('./utils/postToShopify')

exports.handler = async () => {
  const shopifyResponse = await postToShopify({
    query: `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          variants(first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: 'aged-gruyere',
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(shopifyResponse),
  }
}
