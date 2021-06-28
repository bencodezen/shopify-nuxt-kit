const { postToShopify } = require('./postToShopify')

// Takes a single item and creates a cart
exports.createCart = async ({ itemId, quantity }) => {
  try {
    const response = await postToShopify({
      query: `
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              id
              createdAt
              updatedAt
              lines(first:10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                  }
                }
              }
              attributes {
                key
                value
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
        cartInput: {
          lines: [
            {
              quantity,
              merchandiseId: `${itemId}`,
            },
          ],
          attributes: {
            key: 'cart_attribute',
            value: 'Some cart attribute',
          },
        },
      },
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
