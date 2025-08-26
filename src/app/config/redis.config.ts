/* eslint-disable no-console */
import { createClient } from 'redis';
import { envVars } from './env';

export const redisClient = createClient({
    username: envVars.REDIS_USERNAME,
    password: envVars.REDIS_PASSWORD,
    socket: {
        host: envVars.REDIS_HOST,
        port: Number(envVars.REDIS_PORT)
    }
});


redisClient.on('error', err => console.log('Redis Client Error', err));

async function runRedis() {
    await client.connect();

    await client.set('foo', 'bar');
    const result = await client.get('foo');
    console.log(result);  // >>> bar
}

runRedis().catch(console.error);

