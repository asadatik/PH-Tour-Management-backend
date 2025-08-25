/* eslint-disable no-console */
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'IOrGKoXk1SCAlIBTCUAOhhb77NVaselb',
    socket: {
        host: 'redis-14264.c10.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 14264
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function runRedis() {
    await client.connect();

    await client.set('foo', 'bar');
    const result = await client.get('foo');
    console.log(result);  // >>> bar
}

runRedis().catch(console.error);

