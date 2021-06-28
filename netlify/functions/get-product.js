const { postToShopify } = require('./utils/postToShopify')

exports.handler = async (event) => {
  const { itemHandle } = JSON.parse(event.body)

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
      handle: itemHandle,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(shopifyResponse),
  }
}
