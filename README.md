# todo-app

Simple todo app built with Node, Express, React and Vite using TypeScript

## Running the app

To run the application you need to setup proper environment variables for both `api` and `client`.

`.env` file for `api` should have the following

```
DP_PATH=<path to db for example ./data/dev.sql>
PORT=<port used for server (defaults to 8080)>
```

`.env` file for `client` should have the following

```
VITE_BACKEND_URL=<url to backend (defaults to http://localhost:8080/api)>
```

Make sure to run

```
npm install
```

in both `client` and `api` directories. After installing all dependencies run

```
npm start
```

in both directories to start the application.

## Development

In case you want to develop the app you can use command `npm run dev` for starting `api`. This restarts the process after file changes. Client will hot-reload changes with normal `npm start` command.

## Tests

### API

API has few integration tests checking that all routes return correct statuses and data. To run tests use command

```
npm run test
```

For development purposes you can use command

```
npm run test:tdd
```

This will rerun tests after file changes

### Client

TODO
