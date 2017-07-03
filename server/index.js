import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';

// middleware
import bodyParser from 'body-parser';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

// mongoDB
import setupDB from './mongoose';

import RootSchema from './rootSchema';

dotenv.config();

const app = express();

const db = setupDB();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(bodyParser.json());

// CORS-enabled GraphQL server
app.use('/graphql', cors(), graphqlHTTP({
	schema: RootSchema,
	graphiql: true
}));

function listen() {
	app.listen(app.get('port'), () => {
		console.info(`Application listening on port ${app.get('port')}`);
	});
}

db
	.on('error', console.error)
	.on('disconnected', setupDB)
	.once('open', () => {
		console.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);
		listen();
	});
