# Book That Room

<p align="center">
  <img src="assets\ReadmePicture.webp" width="500">
</p>

**Application website:** [Book That Room](https://idatt2105-project.vercel.app/)

Made by: Henrik Berg, Victor Kaste, Viktor Grevskott
Last run CI/CD: [Github Actions](https://github.com/diderikk/idatt2105_project/actions)

## Content

1. [Introduction](#introduction)
2. [Functionality](#functionality)
3. [ER-diagram](#er-diagram)
4. [REST-API](#rest-api)
5. [Security](#security)
6. [CI/CD](#cicd)
7. [Dependencies](#dependencies)
8. [Future work](#future-work)
9. [Installation manual](#installation-manual)
10. [Running tests](#running-tests)

## Introduction

## Functionality

### User

- Log in
- View user's reservations
- Book rooms/sections of a room
- Administer user's reservations
- View all rooms
- Join room chat
- View profile information

### Admin

- Log in
- View and administer all reservations
- View and administer all rooms
- View and administer all users
- Create users, rooms and reservations
- View statistics of rooms and users
- Join room chat

## ER-diagram

## REST-API

## Security

## CI/CD

### CI

### CD

## Dependencies

### Backend

- Maven
  - Build automation tool for the backend application written in Java
- Spring Boot
  - Application framework for easily creating stand-alone applications with Java
- Spring Security
  - Powerful authentication and access-control framework. Standard for Spring-based applications when using Spring Boot
- Swagger
  - For hosting of API.
- Java Persistence API (JPA)
  - A programming interface specification for management of relational data in Java applications
- Docker (optional)
  - Can be used to safely build and run applications in isolated containers

### Frontend

- Vue.js 3
  - Open source JavaScript framework for building interfaces and applications
- Typescript
  - A strict syntactical superset of JavaScript programming language, helpful to avoid typical JavaScript errors
- Babel
  - Free and open-source JavaScript compiler, so that the code can be run by older JavaScript engines
- ESlint
  - Static code analysis tool for problem identification in JavaScript code
- Bulma
  - Free open-source CSS framework that provides ready-to-use components to build responsive web interfaces

## Future work

### Reservation of equipment

### Reservation cache

### Visitor registration

### Refresh tokens

### Groups

### Server performance

## Installation manual

For building and running the application on different environments, [Docker](https://docs.docker.com/engine/install/) can be used.
[Maven](https://maven.apache.org/install.html) is needed to run backend application.

To run the server and client locally (so that they communicate with eachother):

Change constant isTesting to **true** in _frontend/src/backend.ts_ and run following commands under, depending on the wished behaviour of the application.

To run Spring Boot a config.properties file is needed in _src/main/resources_

```
database.url=DATABASE_URL
database.username=DATABASE_USERNAME
database.password=DATABASE_PASSWORD
// Admin user created on startup
root.email=ROOT_EMAIL
root.password=ROOT_PASSWORD
email.email=EMAIL_EMAIL
email.password=EMAIL_PASSWORD
```

### Backend

_Make (with Docker and Maven)_

```
make backend_dev
```

_Docker (with Maven)_

```
mkdir backend/src/main/resources/keystore
keytool -genkeypair -dname "cn=, ou=, o=, c=NO" -alias fullstack -storepass password -keypass password -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore backend/src/main/resources/keystore/cert_key.p12 -validity 3650
mvn -B -DskipTests -f ./backend package
docker build -t backend-server ./backend
docker run -p 8443:8443 --name backend --rm backend-server

```

_Maven_

```
cd backend/
./mvnw spring-boot:run
```

### Frontend

_Make (with Docker and Maven)_

```
make frontend_serve
```

_Docker (with Maven)_

```
docker build -t frontend-server ./frontend
docker run -p 3000:3000 --name frontend --rm frontend-server
```

_npm (node package manager)_

```
cd frontend/
npm install
npm run serve
```

## Running tests

User Maven commands to run tests (backend):

```
cd backend/
./mvnw test
```
