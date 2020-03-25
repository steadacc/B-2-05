
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          'id': 1,
          'name': 'Red dead',
          'code': '12345abcde',
          'status': 'ACTIVE',
          'price': 53.222,
          'exit_date': '2018-09-21',
          'available': true,
          'created_at': new Date(),
          'edited_at': null,
        },
        {
          'id': 2,
          'name': 'Call of duty',
          'code': 'reqsdc23459',
          'price': 53.222,
          'status': 'PENDING',
          'created_at': new Date(),
          'edited_at': null,
        },
        {
          'id': 3,
          'name': 'Fifa',
          'code': 'lowesq90876',
          'price': null,
          'status': 'ACTIVE',
          'created_at': new Date(),
          'edited_at': null,
        },
      ])
    })
}
