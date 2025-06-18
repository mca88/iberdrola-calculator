// import fs from 'fs';
import path from 'path';
import fs from 'fs'
import { processCSV } from '@/services/csvProcessor';
import { parsedDate } from '@/utils/dates';
import './utils'
import { ConsuptionDayData } from '@/types/csv.types';

describe('parserConsuptionCSV', () => {
    const fixturesPath = path.join(__dirname, 'fixtures')

    describe('OK Tests', () => {
        test('Regular schema', () => {
            const validCSV = 
            `CUPS;Fecha;Hora;Consumo_kWh;Metodo_obtencion
            ES0021000013885722RK;30/04/2025;1;0,057;R
            ES0021000013885722RK;25/01/2024;2;0,059;R
            ES0021000013885722RK;01/10/2000;10;0,001;R`.cleanCSV();

            const result = processCSV(validCSV);
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                Fecha: parsedDate('30/04/2025'),
                Hora: 1,
                Consumo_kWh: 0.057
            });
            expect(result[1]).toEqual({
                Fecha: parsedDate('25/01/2024'),
                Hora: 2,
                Consumo_kWh: 0.059
            });
            expect(result[2]).toEqual({
                Fecha: parsedDate('01/10/2000'),
                Hora: 10,
                Consumo_kWh: 0.001
            });
        })
        test('Own schema', () => {
            const validCSV   = 
            `Fecha;Hora;Consumo_kWh
            29/03/2025;1;0,15
            16/08/2025;9;2,34
            01/04/2026;24;0,00`.cleanCSV();

            const result = processCSV(validCSV);
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({
                Fecha: parsedDate('29/03/2025'),
                Hora: 1,
                Consumo_kWh: 0.15
            });
            expect(result[1]).toEqual({
                Fecha: parsedDate('16/08/2025'),
                Hora: 9,
                Consumo_kWh: 2.34
            });
            expect(result[2]).toEqual({
                Fecha: parsedDate('01/04/2026'),
                Hora: 24,
                Consumo_kWh: 0
            });
        })
        test('Switched colums', ()=>{
            const validCSV   = 
            `Hora;Consumo_kWh;Fecha
            1;0,15;29/03/2025
            9;2,34;16/08/2025`.cleanCSV();

            const result = processCSV(validCSV);
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                Fecha: parsedDate('29/03/2025'),
                Hora: 1,
                Consumo_kWh: 0.15
            });
            expect(result[1]).toEqual({
                Fecha: parsedDate('16/08/2025'),
                Hora: 9,
                Consumo_kWh: 2.34
            });
        })
    })

    describe('Headers errors', () => {
        test('Missing 3 headers', () => {
            const expectedErrorMsg = "Cabeceras requeridas faltantes: Fecha, Hora, Consumo_kWh. Las cabeceras obligatorias son: Fecha, Hora, Consumo_kWh"
            const missingHeader  = 
            `1;0,15;29/02/2025
            9;2,34;16/08/2025`.cleanCSV();

            expect(() => processCSV(missingHeader)).toThrow(Error(expectedErrorMsg));
        })
        test('Missing 2 headers', () => {
            const expectedErrorMsg = "Cabeceras requeridas faltantes: Hora, Consumo_kWh. Las cabeceras obligatorias son: Fecha, Hora, Consumo_kWh"
            const missingHeader  = 
            `Fecha
            23/02/2025
            16/08/2025`.cleanCSV();

            expect(() => processCSV(missingHeader)).toThrow(Error(expectedErrorMsg));
        })
        test('Missing 1 headers', () => {
            const expectedErrorMsg = "Cabeceras requeridas faltantes: Consumo_kWh. Las cabeceras obligatorias son: Fecha, Hora, Consumo_kWh"
            const missingHeader  = 
            `Fecha;Hora
            23/02/2025;8
            16/08/2025;9`.cleanCSV();

            expect(() => processCSV(missingHeader)).toThrow(Error(expectedErrorMsg));
        })
        test('Empty csv', () => {
            const expectedErrorMsg = "El CSV está vacío o no contiene datos válidos"
            const emptyCSV  = ``;

            expect(() => processCSV(emptyCSV)).toThrow(Error(expectedErrorMsg));
        })
        test('Only headers', () => {
            const expectedErrorMsg = "El CSV está vacío o no contiene datos válidos"
            const onlyHeaders  = 
            `Hora;Consumo_kWh;Fecha`;

            expect(() => processCSV(onlyHeaders)).toThrow(Error(expectedErrorMsg));
        })
    })

    describe('Hora format', () =>{
        test('Missing Hora value', () => {
            const expectedErrorMsg = "Fila 2: Faltan datos en el campo de la hora"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            23/02/2025;1;0,15
            23/02/2025;;2,34`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg));
        })
        test('Hora < 1', () => {
            const expectedErrorMsg = "Fila 2: El valor de la hora debe estar entre 1 y 24"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            23/02/2025;1;0,15
            23/02/2025;0;2,34`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg));
        })
        test('Hora > 24', () => {
            const expectedErrorMsg = "Fila 2: El valor de la hora debe estar entre 1 y 24"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            23/02/2025;1;0,15
            23/02/2025;25;2,34`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg));
        })
        test('Wrong values in Hora', () => {
            const expectedErrorMsg = "Fila 2: El valor de la hora no es un número válido"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            23/02/2025;1;0,15
            23/02/2025;una;2,34`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg));
        })
    })

    describe('Consumo_kWg format', () => {
        test('Missing Consumo_kWh value', () =>{
            const expectedErrorMsg = "Fila 2: Faltan datos en el campo del consumo"
            const badFormat  = 
            `Consumo_kWh;Fecha;Hora
            2,34;23/02/2025;9
            ;23/02/2025;9`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg));
        })

        test('. instead of , for separator', () => {
            const expectedErrorMsg = "Fila 2: Faltan datos en el campo del consumo"
            const badFormat  = 
            `Consumo_kWh;Fecha;Hora
            2,34;23/02/2025;9
            2.34;23/02/2025;9`.cleanCSV();

            const result = processCSV(badFormat);

            expect(result[0].Consumo_kWh === 2.34)
        })
    })

    describe('Fecha format', () => {
        test('Missing Fecha value', () =>{
            const expectedErrorMsg = "Fila 2: Faltan datos en el campo de la fecha"
            const badFormat  = 
            `Fecha;Consumo_kWh;Hora
            23/02/2025;2,34;9
            ;2,34;9`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg))
        })
        test('Wrong date separators (dd-mm-yyyy)', () => {
            const expectedErrorMsg = "Fila 2: La fecha no es válida o tiene un formato incorrecto"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            30/07/2025;1;0,15
            29-02-2025;1;0,15`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg))
        })
        test('Wrong date format (mm/dd/yyyy)', () => {
            const expectedErrorMsg = "Fila 2: La fecha no es válida o tiene un formato incorrecto"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            30/01/2025;1;0,15
            01/30/2025;1;0,15`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg))
        })
        test('leap year', () => {
            const expectedErrorMsg = "Fila 2: La fecha no es válida o tiene un formato incorrecto"
            const badFormat  = 
            `Fecha;Hora;Consumo_kWh
            30/01/2025;1;0,15
            29/02/2025;1;0,15`.cleanCSV();

            expect(() => processCSV(badFormat)).toThrow(Error(expectedErrorMsg))
        })
    })

    describe('Local .csv from i-de website', () => {
        test('May receipt', () => {
            const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-mayo.csv'), 'utf8')
            const result = processCSV(content);
            expect(result).toHaveLength(696);

            //Some random rows
            expect(result[20]).toEqual({
                Fecha: parsedDate('30/04/2025'),
                Hora: 21,
                Consumo_kWh: 0.363
            })

            expect(result[359]).toEqual({
                Fecha: parsedDate('14/05/2025'),
                Hora: 24,
                Consumo_kWh: 0.195
            })

            expect(result[600]).toEqual({
                Fecha: parsedDate('25/05/2025'),
                Hora: 1,
                Consumo_kWh: 0.052
            })

            expect(result[189]).toEqual({
                Fecha: parsedDate('07/05/2025'),
                Hora: 22,
                Consumo_kWh: 1.155
            })
        })
    })
})