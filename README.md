[![Build Status](https://travis-ci.com/FunbiOyede/Tripped.svg?branch=master)](https://travis-ci.com/FunbiOyede/Tripped)

## Tripped [API]✈️

This is an Api for managing itineraries mainly for holidays and vacations.

### Tech Stack

The codebase is [Nodejs](https://nodejs.org/en/),[Redis](https://redis.io/),[MongoDB](https://www.mongodb.com/),[Amazon S3](https://s3.console.aws.amazon.com/)

### API documentation

👉 [here](https://documenter.getpostman.com/view/8981963/TVt17PZA)

### Requirements

- [Nodejs](https://nodejs.org/en/) v10 and above
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/).
- [Redis](https://redis.io/)
- [Amazon S3](https://s3.console.aws.amazon.com/)

### Design Notes

This is a basic Nodejs api. The idea of this project is to manage itenaries for holidays, more like a trip planner.

The api makes use of MongoDB as a primary data store, redis for storing short term data, E.g lists of trips for a particular user and Amazon S3 for object storage.

Redis is an interesting choice of data store due to the rich set of features in terms of caching and other things. The api uses a "cache aside" caching technique for trips,In cache-aside, the application is responsible for fetching data from the database"in this case mongodb and populating the cache. So other subsequent networks calls are made to the cache.

### Setup Notes

- To use the authentication routes you need a valid token from google oauth client, the token is then sent to the Google oauth API to get the payload, which conatins the user's credentials. I only did it this way because saving passwords can be a drag, so you need a front-end that implements a sign in and sign up with google. And the same thing applies for testing, its currently disabled, So when you have the token, you can enable it and put the token where it needs to be.
- This project also uses open weather api to get weather data for specific locations. So head on to [Open weather](https://openweathermap.org/api) to get your api key.

### Getting Started

- Clone this repository
- Navigate into the [cloned] project directory.
- Install dependencies:

```
 yarn install
```

- Create a .env file in the root of the project directory and

```
check .env.example for required variables

```

- Starting Application Locally:

```
 yarn dev
```

#### Test

- Run unit tests by running the following:

```
# runs all tests with jest
yarn test:unit
```

#### Deployments
