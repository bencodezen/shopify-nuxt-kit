const { postToShopify } = require('./postToShopify')

// Takes a single item and creates a cart
exports.updateCart = async ({ cartId, itemId, quantity }) => {
  const { cartId, itemId, quantity } = JSON.parse(event.body)

  try {
    const response = await postToShopify({
      query: gql`
        mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: {
        cartId,
        lines: {
          id: itemId,
          quantity,
        },
      },
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
