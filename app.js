
// ESM
import helmet from '@fastify/helmet';
import Fastify from 'fastify';
import rateLimit from '@fastify/rate-limit';
import userRoute from './routes/UserRoute.js';
import fastifyCors from '@fastify/cors';
const fastify = Fastify({
    logger: true
})
fastify.register(helmet)
fastify.register(rateLimit, {
    max: 100, // max requests per time window
    timeWindow: 1000, // reset window
})
fastify.register(fastifyCors, {
    // add wildcard "*" to origin array if you want any website to get access on your api
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
});
fastify.register(userRoute)
fastify.listen({ port: 3000 }, async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})