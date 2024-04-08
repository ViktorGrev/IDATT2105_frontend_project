# Rizzlet

<p align="center">
  <img src="./src/assets/rizzletRpng.png" width="500">
</p>

**Application website:** [Rizzlet](rizzlet.no)

Made by: Henrik Berg, Victor Kaste, Viktor Grevskott


## Content

1. [Introduction](#introduction)
2. [Functionality](#functionality)
3. [API Usage](#api-usage)
4. [Security](#security)
5. [CI/CD](#cicd)
6. [Dependencies](#dependencies)
7. [Future work](#future-work)
8. [Installation manual](#installation-manual)
9. [Running tests](#running-tests)
10. [Contact](#contact)

## Introduction

A group project in the class idatt2105 at ntnu. The application is a quiz aplication where users can make their own quizzes, and play quizzes made by other people. 

## Functionality

### User

- Log in
- Play quizzes
- Make quizzes
- Edit own made quizzes
- Delete own made quizzes
- Edit co-authored quizzes
- View profile information
- Edit profile infomation
- View quizz results

### Admin

- Log in
- Play quizzes
- Make quizzes
- Edit all quizzes
- Delete all quizzes
- View profile information
- Edit profile infomation
- View quizz results

## API-usage
The program uses pre made axios method go access the backend endpoint across the entire program.

## Security
The application checks wheter a user is logged in correctly

## CI/CD
The group has has tried to use CI/CD, but it will not complete due to TypeScript errors

## Dependencies

Dependencies can be found in the package.json file

## Frontend technology

- Vue.js 3
  - Open source JavaScript framework for building interfaces and applications
- Typescript
  - A strict syntactical superset of JavaScript programming language, helpful to avoid typical JavaScript errors
- Vitest
  - Testing framework used to unit test
- Cypress
  - Testing framework for js, used for e2e testing
- ESLint
  - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

## Future work

#### Fully working CI/CD

#### Images for quizzes

#### Fully functional openAPI generating

#### Get cypress tests to work on test data
- Used to work on old test data, but needs update



## Installation manual
### Prerequisites

To run this application you will need

- node version 16 or higher
- npm

#### Installation guide

1. Clone the repo
   ```sh
   git clone git@github.com:ViktorGrev/IDATT2105_project.git
   ```
2. Change directory into the downloaded repo
   ```sh
   cd IDATT2105_project
   ```
3. Install all dependencies using yarn

   ```sh
   npm install
   ```

   note: all npm dependencies can be found in the `package.json` file.

#### Running the program
You will need to have the [Backend](https://github.com/ViktorGrev/IDATT2105_backend) up and running to get full functionallity
  ```sh
   npm run dev
   ```

## Running tests

Unit test:

```
npm run test:unit
```

End 2 end test (e2e)
```
npx cypress open
```

## Contact

Henrik Berg - henridb@stud.ntnu.no \
Victor Kaste - vekaste@stud.ntnu.no \
Viktor Grevskott - viktorgg@stud.ntnu.no
