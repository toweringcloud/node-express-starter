# node-express-starter

node based express web app using mongodb and pug

## how to run

### setup

- install latest nodejs runtime

```sh
$ node -v
v22.16.0

$ npm -v
10.9.2
```

### configure

- run nodejs app with nodemon environment

```sh
$ npm init
$ npm i
$ vi .env
API_PORT_NO=4000
COOKIE_SECRET={YOUR_COOKIE_SECRET}
DB_URL=mongodb://127.0.0.1:27017/movie
GH_API_URL=https://api.github.com
GH_AUTH_URL=https://github.com/login/oauth
GH_CLIENT_ID={YOUR_GITHUB_CLIENT_ID}
GH_CLIENT_SECRET={YOUR_GITHUB_CLIENT_SECRET}
```

### launch

- run nodejs app with nodemon environment

```sh
$ npm run dev
```

### test

- download sample media file
  - [Pexcel](https://www.pexels.com)
  - [Sample](https://www.sample-videos.com)
