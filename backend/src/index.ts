import Fastify from 'fastify';
import authPlugin from '@plugins/auth'
import { admin } from '@firebase/firebase'
import userRoutes from './routes/users';
import cors from '@fastify/cors';

declare module 'fastify' {
    interface FastifyRequest {
        user: admin.auth.DecodedIdToken | null
    }
}

const app = Fastify({
    logger: true,
});

app.register(cors, {
    origin: true, // o especifica una URL como: 'http://localhost:3000'
    credentials: true,
});

app.register(authPlugin)
app.register(userRoutes, { prefix: '/users' });

app.get('/', async (request, reply) => {
    return { message: 'Holaaa, Fastify con TypeScript!' };
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Servidor escuchando en http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
