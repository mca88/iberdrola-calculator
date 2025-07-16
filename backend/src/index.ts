import Fastify from 'fastify';
import authPlugin from './plugins/auth';
import userRoutes from './routes/users';
import cors from '@fastify/cors';
import csvRoutes from './routes/csv';
import { admin } from 'firebase';
import dotenv from 'dotenv';
dotenv.config();


declare module 'fastify' {
    interface FastifyRequest {
        user: admin.auth.DecodedIdToken | null
    }
}

const app = Fastify({
    logger: true,
    bodyLimit: 10 * 1024 * 1024
});

app.register(cors, {
    origin: ['http://localhost:5173', 'https://iberdrola-calculator.vercel.app'],
    credentials: true,
});

app.register(authPlugin)
app.register(userRoutes, { prefix: '/users' });
app.register(csvRoutes, { prefix: '/csv' });

const start = async () => {
    try {
        await app.listen({ port: parseInt(process.env.PORT!), host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
