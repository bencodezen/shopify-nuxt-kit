const { createCart } = require('./utils/createCart')
const { updateCart } = require('./utils/updateCart')

/**
 * Expects a POST method
 * with a body object that contains
 * the `cartId`
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({ cartId: 123 })
 * })
 * ```
 */
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
