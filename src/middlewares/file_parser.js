
const _error = require('../views/error')
const multiparty = require('multiparty')
const fs = require('fs')
const mime = require('mime-types')
const { compose, isNil, ifElse, always, prop } = require('ramda')

const file_parser = (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, (error, fields, files) => {
    // inizio input filter
    if (!prop('file', files)) {
      return res.status(400).json({
        message: 'file is required',
      })
    }

    if (!prop('name', fields)) {
      return res.status(400).json({
        message: 'name is required',
      })
    }
    // fine input filter

    if (error) {
      return res.status(400).json({
        error,
        message: error.message,
      })
    }

    const path = files.file[0].path
    const buffer = fs.readFileSync(path)
    const ext = mime.lookup(files.file[0].originalFilename)
    const file_name = files.file[0].originalFilename // NOME ORIGINALE DEL FILE
    // SE NON È STATO PASSATO IL NAME ALLORA VIENE IMPOSTATO COME NAME IL NOME ORIGINALE DEL FILE
    const name = ifElse(compose(isNil, prop('0'), prop('name')), always(file_name), compose(prop('0'), prop('name')))(fields)
    console.log(file_name)
    req.file = {
      file_name,
      path,
      buffer,
      name,
      ext,
    }

    if (fields.hasOwnProperty('acl')) {
      fields.acl = fields.acl[0]
      if (fields.acl !== 'private' && fields.acl !== 'public-read') {
        _error.generic(res)({ status: 406, message: 'acl value is not valid,value accepted are public-read and private' })
      }
    } else {
      fields.acl = 'private'
    }

    req.fields = fields
    next()
  })
}

module.exports = {
  file_parser,
}
