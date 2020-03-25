/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint no-undef: 'error' */

const R = require('ramda')
const request = require('supertest')

describe('Product action', () => {
  let app

  beforeEach((done) => {
    app = require('../../src')
    done()
  })

  it('should upload image in dir avatar', (done) => {
    request(app)
      .post('/v1/upload/avatar')
      .set('Authorization', 'Bearer user')
      .attach('file', './spec/helpers/file/prova.jpg')
      .field('name', 'test')
      .end((err, res) => {
        // console.log(res.body, res.error)
        if (err) {
          throw err
        }
        expect(res.body).toEqual({ key: 'avatar/2', acl: 'public-read', mimetype: 'image/jpeg' })

        done()
      })
  })

  it('should upload image in dir event', (done) => {
    request(app)
      .post('/v1/upload/event')
      .set('Authorization', 'Bearer user')
      .attach('file', './spec/helpers/file/prova.jpg')
      .field('name', 'test')
      .end((err, res) => {
        if (err) {
          throw err
        }
        expect(R.omit(['key'], res.body)).toEqual({ acl: 'public-read', mimetype: 'image/jpeg' })

        done()
      })
  })
  it('should cannot upload return 406(file not is image)', (done) => {
    request(app)
      .post('/v1/upload/event')
      .set('Authorization', 'Bearer user')
      .attach('file', './spec/helpers/file/test.html')
      .field('name', 'test')
      .expect(406, done)
  })
})
