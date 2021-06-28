const { createCart } = require('./utils/createCart')
const { updateCart } = require('./utils/updateCart')

exports.handler = async (event) => {
  const eventBody = JSON.parse(event.body)

  if (eventBody.cartId) {
    const updateCartResponse = await updateCart(eventBody)

    return {
      statusCode: 200,
      body: JSON.stringify(updateCartResponse),
    }
  } else {
    const createCartResponse = await createCart(eventBody)

    return {
      statusCode: 200,
      body: JSON.stringify(createCartResponse.cartCreate.cart),
    }
  }
}
