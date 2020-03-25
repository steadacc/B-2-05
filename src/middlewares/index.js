const { compose, split, equals, prop, or } = require('ramda')

const error = require('../views/error')

const set_acl = (req, res, next) => {
  if (req.params.location === 'avatar' || req.params.location === 'event') {
    req.fields.acl = 'public-read'
  }
  next()
}

// SOLO PER AVATAR,EVENT(URI PARAMS)
const check_image = (req, res, next) => {
  const uri_param = req.params.location

  const location_is_avatar_or_event = or(uri_param === 'avatar', uri_param === 'event')
  const type_file = compose(split('/'), prop('ext'))
  const is_image = compose(equals('image'), prop('0'), type_file)(req.file) // SE IL FILE È UN'IMMAGINE

  if (!is_image && location_is_avatar_or_event) {
    const body_error = { status: 406, message: `the file to be uploaded must be the image` }
    return error.generic(res)(body_error)
  }

  next()
}

module.exports = {
  set_acl,
  check_image,
}
