import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';

// middleware
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import PassportLocal from 'passport-local';

// mongoDB
import setupDB from './mongoose';

// graphql
import RootSchema from './rootSchema';

// passport
import User from './models/user';

dotenv.config();

const app = express();

const db = setupDB();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

// passport config
passport.use(new PassportLocal.Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// CORS-enabled GraphQL server
app.use('/graphql', cors(), graphqlHTTP({
	schema: RootSchema,
	graphiql: true
}));



function authenticationMiddleware() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.status(200).send('NOT AUTHORIZED');
	};
}

app.get('/', function (req, res) {
    res.status(200).send('HOME');
});

app.get('/secret', authenticationMiddleware(), function(req, res) {
	console.log(req.session)
	res.status(200).send('SECRET');
});

app.use('/login', cors());

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/login.html');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	console.log(req.isAuthenticated());
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ isAuthenticated: req.isAuthenticated() }));
	// res.redirect('/graphql');
});

app.get('/register', function(req, res) {
	res.sendFile(__dirname + '/register.html');
});

app.post('/register', function (req, res) {
	User.register(new User({
		username: req.body.username
	}), req.body.password, function (err, account) {
		if (err) {
			return res.status(200).send(err);
		}
		console.log('req.body', req.body);
		passport.authenticate('local')(req, res, function () {
			res.redirect('/secret');
		});
	});
});






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
