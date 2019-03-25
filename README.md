# One Sunday At A Time Website
The main website for [One Sunday At A Time](https://www.onesundayatatime.com)

## Layout 🗺

This repo has the following structure:

```
/
|
|- api/                   # Contains a Serverless API which proxies data from an Airtable base
|   |
|   |- handler.js         # Entrypoint for API code, also main routing system for API requests.
|   |- layout.js          # Layout endpoints/function code
|   |- serverless.yml     # Serverless configuration
|
|- web/                   # Contains a React app and all necessary build tools
    |
    |- dist/              # Folder for built JS files and assets; these are uploaded to s3 with Webpack
    |
    |- src/
        |
        |- assets/        # loading spinner, fonts, etc
        |- components/    # View components
        |- containers/    # Container/higher-order components
        |- styles/        # CSS objects
        |- types/         # Typescript types/interfaces
        |- Routes.tsx     # react-router routes
        |- index.tsx      # Entrypoint for React app
```

## Dependencies 📝

Two .env files are required - one in /api and one in /web. 

api/.env
```
AIRTABLE_KEY=xxxxxxxxxxxx
AIRTABLE_BASE_ID=xxxxxxxxxxxxxx
```

web/.env
```
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFRONT_DISTRIBUTION_ID=XXXXXXXXXXXX
```

Note that you will also need to run

```
export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export AWS_REGION=<region>
```

in order to deploy using Serverless. This assumes your AWS keys have broad-enough permissions to deploy Lambdas and write to s3.

## Set up 🚀

Once your .envs are created, it's time to turn on the engine. 

To run the front-end:

```
cd website/web && yarn 
yarn dev
open http://localhost:8080
```

## Build and Deploy 📦

From within either api/ or web/:

```
yarn deploy
```

