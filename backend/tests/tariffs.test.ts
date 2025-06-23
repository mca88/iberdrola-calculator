import path from 'path';
import fs from 'fs'
import { groupConsuptionsIntoDays, processCSV } from '@/services/csvProcessor';
import './utils'
import { allTariffs } from '@/types/tariffs.types';
import { calculateTariff } from '@/services/calculator';

const fixturesPath = path.join(__dirname, 'fixtures');
const contractedPower = 3.45;
// Margins of error
const priceError = 0.2;
const kwHError = 1;

describe('Noche tariff', () => {
    const nightTariff = allTariffs[0];

    test('february-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-febrero.csv'), 'utf8')
        const consuptions = processCSV(content)
        const grouped = groupConsuptionsIntoDays(consuptions)

        const result = calculateTariff(grouped, nightTariff, contractedPower);
        console.log(result)

        //  Totals
        expect(Math.abs(result.totalPower - 9.68)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.price - 11.72)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.kwH - 82)).toBeLessThanOrEqual(kwHError);
        expect(Math.abs(result.totalPrice - (9.68 + 11.72))).toBeLessThanOrEqual(priceError);

        // Power
        expect(Math.abs(result.highPower - 9.39)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowPower - 0.29)).toBeLessThanOrEqual(priceError);

        // Energy
        //    High
        expect(Math.abs(result.highEnergy.price - 6.96)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.highEnergy.kwH - 40.86)).toBeLessThanOrEqual(kwHError);
        //    Mid
        expect(Math.abs(result.midEnergy.price - 0)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError)
        //    Low
        expect(Math.abs(result.lowEnergy.price - 4.76)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - 41.14)).toBeLessThanOrEqual(kwHError)

    })
    test('march-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-marzo.csv'), 'utf8')
        const consuptions = processCSV(content)
        const grouped = groupConsuptionsIntoDays(consuptions)

        const result = calculateTariff(grouped, nightTariff, contractedPower);
        console.log(result)

        //  Totals
        expect(Math.abs(result.totalPower - 9.68)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.price - 19.79)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.kwH - 140)).toBeLessThanOrEqual(kwHError);
        expect(Math.abs(result.totalPrice - (9.68 + 19.79))).toBeLessThanOrEqual(priceError);

        // Power
        expect(Math.abs(result.highPower - 9.39)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowPower - 0.29)).toBeLessThanOrEqual(priceError);

        // Energy
        //    High
        expect(Math.abs(result.highEnergy.price - 11.21)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.highEnergy.kwH - 65.79)).toBeLessThanOrEqual(kwHError);
        //    Mid
        expect(Math.abs(result.midEnergy.price - 0)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError)
        //    Low
        expect(Math.abs(result.lowEnergy.price - 8.58)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - 74.21)).toBeLessThanOrEqual(kwHError)

    })
    test('april-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-abril.csv'), 'utf8')
        const consuptions = processCSV(content)
        const grouped = groupConsuptionsIntoDays(consuptions)

        const result = calculateTariff(grouped, nightTariff, contractedPower);
        console.log(result)

        //  Totals
        expect(Math.abs(result.totalPower - (1.73 + 10.03))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.price - (3.47 + 17.43))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.kwH - 141)).toBeLessThanOrEqual(kwHError);
        expect(Math.abs(result.totalPrice - (1.73 + 10.03 + 3.47 + 17.43))).toBeLessThanOrEqual(priceError);

        // Power
        expect(Math.abs(result.highPower - (1.68 + 9.73))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowPower - (0.05 + 0.3))).toBeLessThanOrEqual(priceError);

        // Energy
        //    High
        expect(Math.abs(result.highEnergy.price - (2.06 + 12.12))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.highEnergy.kwH - (12.1 + 70.98))).toBeLessThanOrEqual(kwHError);
        //    Mid
        expect(Math.abs(result.midEnergy.price - 0)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError)
        //    Low
        expect(Math.abs(result.lowEnergy.price - (1.41 + 5.31))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - (12.18 + 45.74))).toBeLessThanOrEqual(kwHError)
    })
    test('april-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-mayo.csv'), 'utf8')
        const consuptions = processCSV(content)
        const grouped = groupConsuptionsIntoDays(consuptions)

        const result = calculateTariff(grouped, nightTariff, contractedPower);
        console.log(result)

        //  Totals
        expect(Math.abs(result.totalPower - 10.03)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.price - (5.64 + 11.05))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.totalEnergy.kwH - 114)).toBeLessThanOrEqual(kwHError);
        expect(Math.abs(result.totalPrice - (10.03 + 5.64 + 11.05))).toBeLessThanOrEqual(priceError);

        // Power
        expect(Math.abs(result.highPower - 9.73)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowPower - 0.3)).toBeLessThanOrEqual(priceError);

        // Energy
        //    High
        expect(Math.abs(result.highEnergy.price - (3.55 + 7.22))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.highEnergy.kwH - (20.81 + 42.26))).toBeLessThanOrEqual(kwHError);
        //    Mid
        expect(Math.abs(result.midEnergy.price - 0)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError)
        //    Low
        expect(Math.abs(result.lowEnergy.price - (2.09 + 3.83))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - (17.96 + 32.97))).toBeLessThanOrEqual(kwHError)
    })
})