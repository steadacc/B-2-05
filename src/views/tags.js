const { pick } = require('ramda')

const fields = ['file_name', 'tags']

module.exports = {
  one: pick(fields),
}
