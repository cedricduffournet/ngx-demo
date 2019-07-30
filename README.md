# Angular Demo

[![codecov](https://codecov.io/gh/cedricduffournet/ngx-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/cedricduffournet/ngx-demo)
[![Build Status](https://travis-ci.com/cedricduffournet/ngx-demo.svg?branch=master)](https://travis-ci.com/cedricduffournet/ngx-demo)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This project is using [Angular CLI](https://github.com/angular/angular-cli).

Angular 8+ demo project based created with my [angular starter](https://github.com/cedricduffournet/angular-starter).

## Getting started

```sh
#clone repository
git clone https://github.com/cedricduffournet/ngx-demo.git

#Enter in app folder
cd ngx-demo

#Install package
yarn

#Start developement web server
yarn start
```

use login : `superadmin@dev.com` / pwd : `superadminpwd` to connect

The application's backend is available on <https://github.com/cedricduffournet/symfony-api-demo>. If you don't want to install backend locally, use the demo api for development environment by changing apiHost in `environment.ts`:

Change

```typescript
export const environment = {
  ...
  apiHost: 'http://127.0.0.1:81',
  ...
};
```

To

```typescript
export const environment = {
  ...
  apiHost: 'https://symfony-api-demo.cedricduffournet.com',
  ...
};
```

## Tasks

- `yarn start` run a development web server (<http://localhost:4200>) that watches the files
- `yarn test` run all the jest unit tests once
- `yarn test:watch`  watch all the source files and run all the unit tests when any change
- `yarn lint` check that the code follows style rules
- `yarn build` create a production build of the application

## Running on Docker

The project can run as docker container. This will run application build with nginx web server :

- `make dev` - then navigate to <http://localhost:82>

## Included

- [RxJS](https://github.com/ReactiveX/rxjs) - Reactive Extensions Library for JavaScript
- [@ngrx/store](https://ngrx.io/guide/store) - Bindings to connect the Angular Router to  @ngrx/store
- [@ngrx/effects](https://https://ngrx.io/guide/effects) - Side effect model for @ngrx/store
- [@ngrx/router-store](https://ngrx.io/guide/router-store) - Bindings to connect the Angular Router to  @ngrx/store
- [@ngrx/store-devtools](https://ngrx.io/guide/store-devtools) - Instrumentation for @ngrx/store enabling time-travel debugging
- [@angular/router](https://angular.io/guide/router) - Angular Router
- [@angular/service-worker](https://angular.io/guide/service-worker-intro) - Help precaching data
- [ngx-bootrap](https://valor-software.com/ngx-bootstrap) - Bootstrap components powered by angular
- [@fortawesome/angular-fontawesome](https://fontawesome.com/how-to-use/on-the-web/using-with/angular) - Font Awesome 5 Angular component using SVG with JS
- [@ngx-translate/core](https://github.com/ngx-translate/core) - The internationalization (i18n) library
- [angular2-toaster](https://github.com/Stabzs/Angular2-Toaster) - Toaster Notification library
- [normalizr](https://github.com/paularmstrong/normalizr) - Data Normalization
- [jest](https://jestjs.io/) - JavaScript test runner with easy setup, isolated browser testing and snapshot testing
