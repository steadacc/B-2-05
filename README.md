# Upload API

post upload v1 : parametri accetati file e name
post upload v2 : parametri accetati file,name,acl e prefix

## Database

```bash
npm run mysql -- -e 'create database app'
npm run mysql -- -e 'create database app_test'

npm run db migrate:latest
NODE_ENV=test npm run db migrate:latest
```
