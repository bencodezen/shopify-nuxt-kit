const { createCart } = require('./utils/createCart')
const { updateCart } = require('./utils/updateCart')

/**
 * Expects a POST method
 * with a body object that contains
 * the `cartId`
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
