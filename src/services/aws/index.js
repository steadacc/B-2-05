
const config = require('config')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({ signatureVersion: 'v4' })

const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  region: config.sns.region,
})

const logger = require('pino')()
const aws_logger = logger.child({ module: 'aws' })

const upload_file = (buffer, options) => {
  const params = {
    ACL: options.acl || 'private',
    Body: buffer,
    Bucket: config.s3.bucket,
    Key: `${options.file_name}`,
  }
  return s3.upload(params).promise()
}

const sign_url = (key) => {
  return s3.getSignedUrl('getObject', {
    Bucket: config.s3.bucket,
    Key: key,
  })
}

const send_to_topic = (subject, payload) => {
  return sns
    .publish({
      Subject: subject,
      Message: JSON.stringify(payload),
      TopicArn: config.sns.topic_arn,
      MessageAttributes: {
        subject: {
          DataType: 'String',
          StringValue: config.sns.filter_subject,
        },
      },
    })
    .promise()
    .then((r) => {
      console.log(r)
      return r
    })
    .then(response => Promise.resolve({ payload, response }))
    .catch(err => {
      console.log(err)
      aws_logger.info({ err: err, status: 'ERROR' }, 'Error in send_to_topic')
      return Promise.resolve({ payload, err })
    })
}

module.exports = {
  upload_file,
  sign_url,
  send_to_topic,
}
