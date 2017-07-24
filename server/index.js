// main
import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'request';

//aws
import aws from 'aws-sdk';
import S3Router from 'react-s3-uploader/s3router';

// middleware
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';

// libs
import dotenv from 'dotenv';
import { formatError } from 'apollo-errors';
import PassportLocal from 'passport-local';
import zxcvbn from 'zxcvbn';

// mongoDB
import setupDB from './mongoose';

// graphql
import RootSchema from './rootSchema';

// passport
import User from './models/user';

//mirador
import Mirador from './models/mirador';
import {Image} from './models/image';
import Miradors from './bll/miradors';

dotenv.config();

const app = express();

const db = setupDB();

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

app.set('port', (process.env.PORT || 3001));

// middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// session:
app.use(session({
	secret: '6243@7GLKrs&W6pA$fK!',
	resave: false,
	saveUninitialized: false,
}));


// CORS:
const whitelist = ['http://localhost:3000', 'http://lvh.me:3000', process.env.CLIENT_SERVER, 'http://generate-manifests.orphe.us'];

const corsOptionsDelegate = function (req, callback) {
	const corsOptions = {
		origin: false,
		credentials: true
	};
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions.origin = true;
	}
	callback(null, corsOptions);
};


app.use(cors(corsOptionsDelegate));

// passport config
passport.use(new PassportLocal.Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// GraphQL server
app.use('/graphql', graphqlHTTP({
	schema: RootSchema,
	formatError,
	graphiql: true
}));

// s3
app.use('/s3', S3Router({
	bucket: process.env.AWS_BUCKET,
	ACL: 'public-read',
	uniquePrefix: false
}));

app.post('/createManifest', (req, res) => {
	const newMirador = {
		images: []
	};

	req.body.images.forEach((image) => {
		newMirador.images.push(new Image(image));
	});

	const miradorObject = Object.assign({}, req.body, newMirador);

	const mirador = new Mirador(miradorObject);

	mirador.save((error) => {
		if (error) {
			console.log('Mirador DB save error: ', error);
		} else {
			const reqBody = {manifest: JSON.stringify(req.body), responseUrl: `${process.env.REACT_APP_SERVER}/manifestCreated`};
			request.post('http://generate-manifests.orphe.us/manifests', {form: reqBody});
		}
	});
});

app.post('/manifestCreated', (req, res) => {
	const exampleSecret = 'examplewebhookkey';
	if (req.body.secret === exampleSecret) {
	  Mirador.update(req.body.manifestId, {remoteUri: req.body.manifestUri});

		// Mirador.findByIdAndUpdate(req.body.manifestId, {$set: { remoteUri: req.body.manifestUri }}, {new: true}, (error, manifest) => {
		// 	if (error) {
		// 		console.log('Manifest callback find error: ', error);
		// 	}				else {
		// 		  console.log('updatedManifest LOG', manifest);
		// 	}
		// });
		console.log('MANIFEST CREATED LOG', req.body);
	}
});

// authentication routs:
function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.status(200).send('NOT AUTHORIZED');
	};
}

function checkPasswordStrength() {
	return function (req, res, next) {
		const passwordStrength = zxcvbn(req.body.password, [req.body.username, 'orpheus', 'orphe']);
		if (passwordStrength.score > 3) {
			return next();
		}
		res.send(JSON.stringify({ passwordStrength: passwordStrength }));
	};
}

// app.get('/secret', authenticationMiddleware(), function(req, res) {
// 	res.status(200).send('the secret');
// });

app.get('/login', function(req, res) {
	res.sendFile(`${__dirname}/html/login.html`);
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ username: req.user.username }));
});

app.post('/logout', function(req, res) {
	req.logOut();
	res.send(JSON.stringify({ status: 'Logged out' }));
});

app.get('/register', function(req, res) {
	res.sendFile(`${__dirname}/html/register.html`);
});

app.post('/register', checkPasswordStrength(), function (req, res) {
	User.register(new User({
		username: req.body.username
	}), req.body.password, function (err, account) {
		if (err) {
			return res.status(200).send(err);
		}
		passport.authenticate('local')(req, res, function () {
			res.send(JSON.stringify({ username: req.user.username }));
		});
	});
});


// START application:
function listen() {
	app.listen(app.get('port'), () => {
		console.info(`Application listening on port ${app.get('port')}`);
	});
}

db.on('error', console.error)
	.on('disconnected', setupDB)
	.once('open', () => {
		console.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);
		listen();
	});
