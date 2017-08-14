import redis from 'redis';

const redisSetup = () => {

	const port = process.env.REDIS_PORT;
	const host = process.env.REDIS_HOST;

	const client = redis.createClient(port, host);

	client.on('error', function (err) {
		console.log('Error ' + err);
	});

	client.on('connect', () => {
		console.info(`Connected to redis ( host: ${host}, port: ${port} )`);
	});

	return client;
};

export default redisSetup;
