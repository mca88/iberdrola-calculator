import { FastifyPluginAsync } from 'fastify';
import { db } from '../firebase';


const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/login', async (request, reply) => {
        if (!request.user) return reply.status(401).send({ error: 'Unauthorized' });

        const userDoc = await db.collection('users').doc(request.user.sub).get();

        if (!userDoc.exists) {
            await db.collection('users').doc(request.user.sub).set({
                email: request.user.email,
                createdAt: new Date(),
            });
            return reply.code(201).send({ message: 'Usuario creado', new: true });
        }
        return reply.code(200).send({ message: 'Usuario ya existe', new: false });
    });
}

export default userRoutes;