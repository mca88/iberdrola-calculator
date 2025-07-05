import fastify, { FastifyPluginAsync } from "fastify";
import { groupConsuptionsIntoDays, processCSV } from "@/services/csvProcessor";

const csvRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/upload', async (request, reply) => {

        const { file, name } = request.body as { file: string; name: string };
        console.log(file);

        if (!file) { return reply.status(400).send({ error: 'Error al subir el archvio csv' }); }
        if (!name) { return reply.status(400).send({ error: 'Error en el nombre del archivo csv' }); }

        try {
            const csvResult = processCSV(file);
            const grouped = groupConsuptionsIntoDays(csvResult);

            console.log(grouped);

            return reply.status(200).send({ message: 'Archivo recibido correctamente' });
        } catch (error) {
            return reply.status(400).send({ error: `Error en CSV: ${error}` });
        }
    })
}

export default csvRoutes;