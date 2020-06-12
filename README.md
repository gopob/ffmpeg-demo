# Waveloop
This is multi-package repository managed by [Lerna](https://github.com/lerna/lerna).

## Setup project

### Install root dependencies
```sh
$ npm install
```

### Install all packages dependencies (lerna bootstrap)
```sh
$ npm run bootstrap
```

### Build email templates
```sh
$ cd api
$ npm run build:email
```

#### Project is configured to be run in Docker Containers:
```
* waveloop-api
* waveloop-web
* waveloop-mongo
not used yet * waveloop-scheduler
not used yet * waveloop-redis
```

### To build and start **All** containers
```sh
$ npm start
```

## Development

### For **Development** it is enough to just start mongo / api / web
```sh
$ make mongo-web-api
```
