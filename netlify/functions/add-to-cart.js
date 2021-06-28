const { createCart } = require('./utils/createCart')

exports.handler = async (event) => {
  const eventBody = JSON.parse(event.body)

  if (eventBody.cartId) {
    console.log('Update cart')
  } else {
    const createCartResponse = await createCart(eventBody)

    console.log({ createCartResponse })
  }

  // If no cartId, then
  // Call create-cart
  // If get cartId with product, then
  // Call update-cart

  return {
    statusCode: 200,
    body: 'It works',
  }
}
