const { pick } = require('ramda')

const fields = ['key', 'url', 'name', 'acl', 'mimetype']

module.exports = {
  upload: pick(fields),
}
