const { compose, bind, assoc, concat, equals, T, identity, cond, always, ifElse, prop, tap } = require('ramda')
let crypto = require('crypto')

const view = require('../views/upload')
const error = require('../views/error')
// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const { upload_file, sign_url, send_to_topic } = require('../services/aws')
const { maps_dir_s3, is_image } = require('../services')
const { file_parser } = require('../middlewares/file_parser')
const { set_acl, check_image } = require('../middlewares')

const timestamp = Date.now().toString()
const subject_sns = 'image_upload'

const upload_s3 = (req, res) => {
  
  // SE IL BUCKET È PRIVATO FIRMA URL
  const if_private_sign_url = (obj_s3) => req.fields.acl === 'private' ? sign_url(obj_s3.key) : obj_s3.Location
  upload_file(req.file.buffer, { file_name: req.file.file_name, acl: req.fields.acl })
    .then((obj_s3) => assoc('url', if_private_sign_url(obj_s3), obj_s3))// URL FIRMATO
    .then((obj_s3) => assoc('name', req.file.file_name, obj_s3))
    .then((obj_s3) => assoc('acl', req.fields.acl, obj_s3))
    .then((obj_s3) => assoc('mimetype', req.file.ext, obj_s3))
    .then(
      (obj) =>
        ifElse( // SE È UN IMMAGINE INVIA AL TOPIC SNS
          compose(is_image, prop('mimetype')),
          () => send_to_topic(subject_sns, obj),
          always({ payload: obj })
        )(obj))
    .then(compose(bind(res.status(201).json, res), view.upload, prop('payload')))
    .catch(error.generic(res))
}

let upload = require('express').Router()

upload.post('/',
  file_parser,
  upload_s3
)

module.exports = upload
