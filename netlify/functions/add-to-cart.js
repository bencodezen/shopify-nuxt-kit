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
  const { cartId } = JSON.parse(event.body)

  if (cartId) {
    const updateCartResponse = await updateCart(cartId)

    return {
      statusCode: 200,
      body: JSON.stringify(updateCartResponse),
    }
  } else {
    const createCartResponse = await createCart(cartId)

    return {
      statusCode: 200,
      body: JSON.stringify(createCartResponse.cartCreate.cart),
    }
  }
}
