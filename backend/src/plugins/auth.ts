import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { verifyToken } from '@firebase/auth';

export default fp(async (fastify: FastifyInstance, _opts) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request, reply) => {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            reply.code(401).send({ error: 'No autorizado' });
            return;
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = await verifyToken(token);
            request.user = decoded;
        } catch {
            reply.code(401).send({ error: 'Token inválido' });
        }
    });
});
