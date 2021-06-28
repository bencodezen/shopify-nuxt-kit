/**
 * API endpoint to manage add items to the cart
 *
 * EXAMPLES:
 *
 * Add item to a new cart
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     itemId: 456,
 *     quantity: 4
 *   })
 * })
 * ```
 *
 * Add item to existing cart
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 123,
 *     itemId: 456,
 *     quantity: 4
 *   })
 * })
 * ```
 */

const { createCart } = require('./utils/createCart')
const { updateCart } = require('./utils/updateCart')

exports.handler = async (event) => {
  const { cartId, itemId, quantity } = JSON.parse(event.body)

  if (cartId) {
    console.log('---------')
    console.log('Updating existing cart')
    console.log('---------')

    const updateCartResponse = await updateCart({
      cartId,
      itemId,
      quantity,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(updateCartResponse),
    }
  } else {
    console.log('---------')
    console.log('Creating new cart')
    console.log('---------')

    const createCartResponse = await createCart({
      itemId,
      quantity,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(createCartResponse.cartCreate.cart),
    }
  }
}
