import fastify, { FastifyPluginAsync } from "fastify";
import { groupConsuptionsIntoDays, processCSV } from "@/services/csvProcessor";
import { calculateAllTariffs } from "@/services/calculator";
import { db } from "@/firebase/firebase";

const csvRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/upload', async (request, reply) => {

        const { file, name, power } = request.body as { file: string; name: string, power: number };
        const user = request.user;

        if (!file) { return reply.status(400).send({ error: 'Error al subir el archvio csv' }); }
        if (!name) { return reply.status(400).send({ error: 'Error en el nombre del archivo csv' }); }
        if (!power) { return reply.status(400).send({ error: 'Error en el campo de potencia' }); }
        if (!user) { return reply.status(400).send({ error: 'Error de usuario, por favor reinicia la sesión' }); }

        try {
            const csvResult = processCSV(file);
            const grouped = groupConsuptionsIntoDays(csvResult);

            const allTariffs = calculateAllTariffs(grouped, power);
            const uid = user.uid;

            const docRef = db
                .collection('users')
                .doc(uid)
                .collection('consumptions')
                .doc();

            await docRef.set({
                name,
                power,
                createdAt: new Date().toISOString(),
                results: allTariffs,
            });

            return reply.status(200).send({ message: 'Archivo recibido correctamente' });
        } catch (error) {
            return reply.status(400).send({ error: `Error en CSV: ${error}` });
        }
    })
}

export default csvRoutes;