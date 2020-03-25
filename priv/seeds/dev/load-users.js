
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('carts').del()
      .then(() => knex('products').del())
      .then(function () {
        // Inserts seed entries
        return knex('products').insert([
          {
            id: 1,
            name: 'patate',
            price: 5,
            quantity: 7
          },
          {
            id: 2,
            name: 'pasta',
            price: 4,
            quantity: 20
          },
          {
            id: 3,
            name: 'sugo',
            price: 4,
            quantity: 10
          },
          {
            id: 4,
            name: 'fagioli',
            price: 4,
            quantity: 50
          }
        ])
      })
      .then(() => knex('carts').insert([
        {
          id: 1,
          id_user: 2,
          id_product: 1,
          quantity: 2
        },
        {
          id: 2,
          id_user: 1,
          id_product: 1,
          quantity: 1
        },
        {
          id: 3,
          id_user: 2,
          id_product: 2,
          quantity: 1
        },
      ]))
}
