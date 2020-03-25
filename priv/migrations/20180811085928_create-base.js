
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tags', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.string('file_name').primary()
    t.json('tags').notNull()
  })
}

exports.down = function (knex, Promise) {
}
