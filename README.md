<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

 Api builded with nestjs, swagger, docker and mongodb.

# Running the app with docker orchestration deployment
In the root of the backend project run the following comand:
```bash
docker compose up
```
Aplications avaliable:
- Api dev swagger documentation: http://localhost:8000/api
- Api prod swagger documentation: http://localhost:5000/api
- Mongo DB : http://localhost:27017
- Mongo express interface : http://localhost:8081


# Running the app locally without docker

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# local development
$ yarn start:local
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
