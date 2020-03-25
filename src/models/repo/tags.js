const { exists, reject_with_409 } = require('../../utilities/errors_code')
const { ifElse, identity, tap } = require('ramda')
const Tag = require('../tag')

module.exports = {
  create: (file_name, tags) => {
    const query = Tag.query()
    tags = JSON.stringify(tags)
    return query.where({ file_name: file_name }).first()
      .then((tag) => {
        if (tag) {
          console.log('skssksk  ')
          return Tag.query().where({ file_name: file_name }).patch({ tags: tags })

            .then((tag) => Tag.query().where({ file_name: file_name }).first())
        }
        return Tag.query().insert({ file_name, tags }).then(() => Tag.query().where({ file_name }).first())
      })
  },
}