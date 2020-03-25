const { compose, bind, assoc, concat, equals, T, identity, cond, always, ifElse, prop, tap } = require('ramda')
let crypto = require('crypto')

const repo = require('../models/repo/tags')
const view = require('../views/tags')
const error = require('../views/error')
// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')



const create = (req, res) => {

    repo
        .create(req.body.file_name, req.body.tags)
        .then(compose(bind(res.status(201).json, res), view.one))
        .catch(error.generic(res))
}

let tag = require('express').Router()

tag.post('/',
    create
)

module.exports = tag
