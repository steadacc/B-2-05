/* eslint-disable prefer-promise-reject-errors */
const mock = require('mock-require')

const user_role_admin = {
  id: '1',
  role: 'ADMIN',
}

const user_role_user = {
  id: '2',
  role: 'USER',
}

mock('../../src/microservices/auth', (token) => {
  if (token === 'admin') {
    return Promise.resolve(user_role_admin)
  }

  if (token === 'user') {
    return Promise.resolve(user_role_user)
  }

  return Promise.reject({ error: 'You cannot do that' })
})

mock('../../src/services/aws', {
  upload_file: (buffer, options) => {
    return Promise.resolve({ key: options.file_name, acl: options.acl })
  },
  sign_url: key => {
    return `${key}-signed`
  },
  send_to_topic: (subject, payload) => {
    return Promise.resolve({ payload, response: {} })
  },
})
