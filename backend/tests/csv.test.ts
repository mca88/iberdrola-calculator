// import fs from 'fs';
import path from 'path';
import { processCSV } from '@/services/csvProcessor';

describe('parserConsuptionCSV', () => {
    const fixturesPath = path.join(__dirname, 'fixtures')

    describe('OK CSV String Tests', () => {
        test('Regular schema with 3 entries', () => {
            const validCSV = `CUPS;Fecha;Hora;Consumo_kWh;Metodo_obtencion
                                ES0021000013885722RK;30/04/2025;1;0,057;R
                                ES0021000013885722RK;30/04/2025;2;0,059;R
                                ES0021000013885722RK;30/04/2025;3;0,054;R`;

            const result = processCSV(validCSV);

            expect(result).toHaveLength(3);
        })
    })
})