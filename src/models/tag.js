const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Tag extends Model {
  static get tableName() {
    return 'tags'
  }

  static get idColumn() {
    return 'id'
  }

}

module.exports = Tag