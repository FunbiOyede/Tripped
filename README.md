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

### Getting Started

- Clone this repository
- Navigate into the [cloned] project directory.
- Install dependencies:

```
 yarn install
```

- Create a .env file in the root of the project directory.

- Starting Application Locally:

```
 yarn dev
```

#### Test

##### Run unit tests by running the following:

```
# runs all tests with jest
yarn test:unit
```

### Notes

- To use the authentication api you need a valid token from google oauth client, the token is then sent to the Google oauth API to get the payload, which conatins the user's credentials. I only did it this way because saving passwords can be a drag, so you need a front-end that implements a sign in with google.
- This is api uses a cache aside caching technique on the trips endpoint. For information about caching techniques see [Caching Techniques](https://bluzelle.com/blog/things-you-should-know-about-database-caching#:~:text=Cache%20Aside,will%20retrieve%20the%20data%20directly.)

### Deployment
