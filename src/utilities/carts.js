const { assoc, curry, compose, bind, union, remove } = require('ramda')
const repo = require('../models/repo/carts')
const view = require('../views/cart')
const create = curry((res, body, cart) => {
  return repo.create(body, cart)
    .then(compose(bind(res.status(201).json, res), view.one))
})

const update = curry((res, body, cart) => {
  return repo.update(body, cart)
    .then(compose(bind(res.json, res), view.one))
})

//carts other user rappresenta i carts dell'utente passato come id in params
const merge_carts = (carts_user, carts_other_user) => {
  let carts = union(carts_user, carts_other_user)
    for (let i = 0; i < carts.length; i++) {
      let cart = carts[i]
      for (let j = i + 1; j < carts.length; j++) {
        let cart_ = carts[j]
        if (cart.id_product === cart_.id_product) {
          cart.quantity = cart.quantity + cart_.quantity
          carts = remove(j, j, carts)
        }
      }
    }
    return carts
}

module.exports = {
  merge_carts,
  create,
  update,
}