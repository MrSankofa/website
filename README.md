# onesundayatatime.com

The main website and backend for [One Sunday At A Time](https://www.onesundayatatime.com)

Built with a 100% serverless architecture.

Uses [Airtable](https://airtable.com) as a database, with the benefit of Airtable's UX being a built-in CMS.

Uses [Square](https://squareup.com) for handling transactions via a webhook and updating Airtable based on purchase totals. Because automated accounting is dope.

Uses [Mailchimp](https://mailchimp.com) for handling newsletter signups.

Lambda proxy caching ensures you don't run afoul of Airtable's API rate limits.

Front-end is hosted statically in S3, with a Cloudfront distribution serving up the goods from Edge locations.

## Layout 🗺

This repo has the following structure:

```
/
|
|- api/                   # Contains the Serverless API
|   |
|   |- handler.ts         # Entrypoint for API code, also main routing system for API requests
|   |- serverless.yml     # Serverless configuration
|   |- methods/           # Business logic/controllers
|   |- services/          # Wrappers for third-party libraries
|
|- web/                   # Contains a React app and all necessary build tools
    |
    |- dist/              # Folder for built JS files and assets; these are uploaded to s3 as a static website using Webpack
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
AIRTABLE_KEY=xxxxxxxxxxxxxxxxxx
WEBSITE_BASE_ID=xxxxxxxxxxxxxxxxxx
OS_BASE_ID=xxxxxxxxxxxxxxxxxx
SQUARE_APP_ID=xxxxxxxxxxxxxxxxxx
SQUARE_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SQUARE_WEBHOOK_NOTIFICATION_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SQUARE_WEBHOOK_SIGNATURE_KEY=xxxxxxxxxxxxxxxxxx
SQUARE_OAUTH_TOKEN=xxxxxxxxxxxxxxxxxx
MAILCHIMP_APIKEY=xxxxxxxxxxxxxxxxxx
MAILCHIMP_LIST_ID=xxxxxxxxx
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
```

Navigate to http://localhost:8080 to see the site running on your machine.

## Build and Deploy 📦

From within either api/ or web/:

```
yarn deploy
```
