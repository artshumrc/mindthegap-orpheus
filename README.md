# Mind the Gap: Diasporic Archives in Italy and the US  


The project consists of 2 applications:
1.	React / Redux frontend application based on [`create-react-app`](https://github.com/facebookincubator/create-react-app) in this repository
2.	GraphQL API (Node.js / Express) here: http://gitlab.archimedes.digital/archimedes/mindthegap-orpheus-api/tree/master

## Requirements

In order to develop with this application, you will need the following software installed on your development environment:

* Node 8.x


## Starting the project

### Start the React frontend

To start the project you need to follow these steps:

1.	Clone the this repository (this repository)

2.	Change directory to repository:

	```sh
	$ cd mindthegap-orpheus
	```

3.	Install packages via Yarn:

	```sh
	$ yarn
	```

4.	Setup environment variables:

	Configure these environment variables as necessary for your development environment so that the frontned knows which URL to access the GraphQL API backend at and which other routes to use for the authentication information.

	Environment variables for the frontend:
	```sh
	// client/.env
	REACT_APP_GRAPHQL_SERVER=http://api.mindthegap.orpheus.local:3001
	REACT_APP_GRAPHQL_URI=graphql
	REACT_APP_SERVER=http://api.mindthegap.orpheus.local:3001
	REACT_APP_LOGIN_URI=auth/login
	REACT_APP_LOGOUT_URI=auth/logout
	REACT_APP_REGISTER_URI=auth/register
	REACT_APP_VERIFY_TOKEN_URI=auth/verify-token
	REACT_APP_COOKIE_DOMAIN=mindthegap.orpheus.local
	REACT_APP_BUCKET_URL=https://s3.amazonaws.com/iiif-orpheus

	REACT_APP_FACBOOK_CLIENT_ID=client_id
	REACT_APP_GOOGLE_CLIENT_ID=client_id
	REACT_APP_TWITTER_CLIENT_ID=client_id

	REACT_APP_GOOGLE_MAPS_API_KEY=mapkey
	```

6.	Start the application

	After configuring the environment variables and installing packages, you can start the application with
	```sh
	$ yarn start
	```


## More on environment variables

Priority of environment variables in `.env` files (client and server):

1.	Development:

	1.	`.env.development.local`
	2.	`.env.development`
	3.	`.env.local`
	4.	`.env`

2.	Production:

	1.	`.env.production.local`
	2.	`.env.production`
	3.	`.env.local`
	4.	`.env`

**!IMPORTANT** do NOT commit `.env*.local` files to the repository. These should be used for __personal configuration__ and __secret values__.
