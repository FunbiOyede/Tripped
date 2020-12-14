[![Build Status](https://travis-ci.com/FunbiOyede/Tripped.svg?branch=master)](https://travis-ci.com/FunbiOyede/Tripped)

## Tripped [API]✈️

This is an Api for managing itineraries mainly for holidays and vacations.

### Codebase

The codebase is [Nodejs](https://nodejs.org/en/),[Redis](https://redis.io/) and [MongoDB](https://www.mongodb.com/).

### API documentation 👇

### Requirements

- [Nodejs](https://nodejs.org/en/) v10 and above
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/).
- [Redis](https://redis.io/)

### Notes

- To use the authentication routes you need a valid token from google oauth client, the token is then sent to the Google oauth API to get the payload, which conatins the user's credentials. I only did it this way because saving passwords can be a drag, so you need a front-end that implements a sign in and sign up with google. And the same thing applies for testing, its currently disabled, So when you have the token, you can enable it and put the token where it needs to be.
- This project also uses a cache aside caching technique on the trips routes. For more information about caching techniques see [Caching Techniques](https://bluzelle.com/blog/things-you-should-know-about-database-caching#:~:text=Cache%20Aside,will%20retrieve%20the%20data%20directly.)
- This project also uses open weather api to get weather data for specific locations. So head on to [Open weather](https://openweathermap.org/api) to get your api key.
- Also Create an account with [MongoDB Atlas](https://cloud.mongodb.com/) using the FREE plan.

### Getting Started

- Clone this repository
- Navigate into the [cloned] project directory.
- Install dependencies:

```
 yarn install
```

- Create a .env file in the root of the project directory and add the following

```

PORT=3000 or whatever you want
DATABASE_URL=mongodb://127.0.0.1:27017/Tripped // for developemt
TEST_DB_URL=mongodb://127.0.0.1:27017/TestTripped //for testing
REDIS_URL=redis://127.0.0.1:6379
PRODUCTION_DB_URL=mongodb+srv://<username>:<password>@cluster0.temal.mongodb.net/Tripped?retryWrites=true&w=majority // for production
OPEN_WEATHER_API_KEY=8u2dih94940014nddrr0lal // this is a random key.
OPEN_WEATHER_URL=http://api.openweathermap.org/data/2.5/weather
ACCESS_TOKEN=trippedAcessToken //whatever you like
REFRESH_TOKEN=trippedRefreshToken //whatever you like

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

#### Deployment
