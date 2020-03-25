const { bind, ifElse, isNil, not, identity, compose, always, prop, split, equals } = require('ramda')

const reject = bind(Promise.reject, Promise)
const exists = compose(not, isNil)

const not_found = compose(reject, always({ status: 404, message: 'Not Found' }))
const already_exists = compose(reject, always({ status: 409, message: 'Already exists' }))

const maps_dir_s3 = (location) => {
  const dir_s3 = { avatar: 'avatar', event: 'event', fiscal: 'fiscal' }
  const dir = ifElse(isNil, always('untitled'), identity)
  return dir(prop(location, dir_s3))
}
const type = compose(prop('0'), split('/'))
const is_image = compose(equals('image'), type)

module.exports = {
  if_exists: ifElse(exists, identity, not_found),
  reject_if_already_exists: ifElse(exists, identity, already_exists),
  maps_dir_s3,
  is_image,
}
