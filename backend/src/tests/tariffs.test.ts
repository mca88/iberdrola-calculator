import path from 'path';
import fs from 'fs'
import { allTariffs } from 'types/tariffs';
import { calculateTariff, calculateAllTariffs } from 'services/calculator';
import { processCSV, groupConsuptionsIntoDays } from 'services/csvProcessor';

const fixturesPath = path.join(__dirname, 'fixtures');
const contractedPower = 7.5;
// Margins of error
const priceError = 0.2;
const kwHError = 1;
//Tariffs
const nocheTariff = allTariffs[0];
const tresPeriodosTariff = allTariffs[1];
const inteligenteTariff = allTariffs[2];

describe('Noche tariff', () => {
    test('february-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-febrero.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, nocheTariff, contractedPower);

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
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError);
        //    Low
        expect(Math.abs(result.lowEnergy.price - 4.76)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - 41.14)).toBeLessThanOrEqual(kwHError);

    })
    test('march-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-marzo.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, nocheTariff, contractedPower);

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
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError);
        //    Low
        expect(Math.abs(result.lowEnergy.price - 8.58)).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - 74.21)).toBeLessThanOrEqual(kwHError);

    })
    test('april-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-abril.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, nocheTariff, contractedPower);

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
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError);
        //    Low
        expect(Math.abs(result.lowEnergy.price - (1.41 + 5.31))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - (12.18 + 45.74))).toBeLessThanOrEqual(kwHError);
    })
    test('april-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-mayo.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, nocheTariff, contractedPower);

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
        expect(Math.abs(result.midEnergy.kwH - 0)).toBeLessThanOrEqual(kwHError);
        //    Low
        expect(Math.abs(result.lowEnergy.price - (2.09 + 3.83))).toBeLessThanOrEqual(priceError);
        expect(Math.abs(result.lowEnergy.kwH - (17.96 + 32.97))).toBeLessThanOrEqual(kwHError);
    })
})

describe('3 Periodos Tariff', () => {
    test('1 Day test', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumos-1-dia.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, tresPeriodosTariff, contractedPower);

        const expectedLowEnergyPrice = (0.076 + 0.057 + 0.056 + 0.056 + 0.055 + 0.056 + 0.167 + 0.062) * tresPeriodosTariff.energy_prices.low!;
        const expectedMidEnergyPrice = (0.174 + 0.204 + 0.052 + 0.138 + 0.076 + 0.064 + 0.812 + 0.067) * tresPeriodosTariff.energy_prices.mid!;
        const expectedHighEnergyPrice = (0.055 + 0.172 + 0.128 + 0.053 + 0.053 + 0.053 + 0.059 + 0.249) * tresPeriodosTariff.energy_prices.high!;

        expect(result.lowEnergy.price).toBeCloseTo(expectedLowEnergyPrice, 6);
        expect(result.midEnergy.price).toBeCloseTo(expectedMidEnergyPrice, 6);
        expect(result.highEnergy.price).toBeCloseTo(expectedHighEnergyPrice, 6);
    })
    test('2 Day test', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumos-2-dias.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, tresPeriodosTariff, contractedPower);
        let expectedLowEnergyPrice = (0.057 + 0.059 + 0.054 + 0.053 + 0.052 + 0.053 + 0.166 + 0.058) * tresPeriodosTariff.energy_prices.low!;
        let expectedMidEnergyPrice = (0.063 + 0.052 + 0.051 + 0.115 + 0.104 + 0.105 + 0.227 + 0.276) * tresPeriodosTariff.energy_prices.mid!;
        let expectedHighEnergyPrice = (0.092 + 0.078 + 0.051 + 0.052 + 0.340 + 0.546 + 0.363 + 0.192) * tresPeriodosTariff.energy_prices.high!;

        expectedLowEnergyPrice += (0.215 + 0.217 + 0.077 + 0.052 + 0.048 + 0.048 + 0.052 + 0.053) * tresPeriodosTariff.energy_prices.low!;
        expectedMidEnergyPrice += (0.050 + 0.047 + 0.958 + 0.523 + 0.141 + 0.102 + 0.565 + 0.467) * tresPeriodosTariff.energy_prices.mid!;
        expectedHighEnergyPrice += (0.417 + 0.338 + 1.007 + 0.200 + 0.177 + 0.279 + 0.468 + 0.206) * tresPeriodosTariff.energy_prices.high!;

        expect(result.lowEnergy.price).toBeCloseTo(expectedLowEnergyPrice, 6);
        expect(result.midEnergy.price).toBeCloseTo(expectedMidEnergyPrice, 6);
        expect(result.highEnergy.price).toBeCloseTo(expectedHighEnergyPrice, 6);
    })
    test('Weekend day', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumos-fin-semana.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, tresPeriodosTariff, contractedPower);

        const expectedLowEnergyPrice = (0.048 + 0.091 + 0.447 + 0.053 + 0.053 + 0.053 + 0.052 + 0.047 +
            0.049 + 0.052 + 0.184 + 0.332 + 0.082 + 0.526 + 0.599 + 0.276 +
            0.824 + 0.791 + 0.070 + 0.056 + 0.057 + 0.063 + 0.059 + 0.057) * tresPeriodosTariff.energy_prices.low!;
        const expectedMidEnergyPrice = 0;
        const expectedHighEnergyPrice = 0;

        expect(result.lowEnergy.price).toBeCloseTo(expectedLowEnergyPrice, 6);
        expect(result.midEnergy.price).toBeCloseTo(expectedMidEnergyPrice, 6);
        expect(result.highEnergy.price).toBeCloseTo(expectedHighEnergyPrice, 6);
    })
})

describe('Ahorro inteligente Tariff', () => {
    test('1 Day test', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumos-1-dia.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, inteligenteTariff, contractedPower);

        const expectedLowEnergyPrice = (0.812 + 0.249 + 0.204 + 0.174 + 0.172 + 0.167 + 0.138 + 0.128) * inteligenteTariff.energy_prices.low!;
        const expectedHighEnergyPrice = (0.076 + 0.076 + 0.067 + 0.062 + 0.064 + 0.059 + 0.057 + 0.056 + 0.056 + 0.056 + 0.055 + 0.055 + 0.053 + 0.053 + 0.053 + 0.052) * inteligenteTariff.energy_prices.high!;

        expect(result.lowEnergy.price).toBeCloseTo(expectedLowEnergyPrice, 6);
        expect(result.highEnergy.price).toBeCloseTo(expectedHighEnergyPrice, 6);
    })
    test('2 Day test', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumos-2-dias.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateTariff(grouped, inteligenteTariff, contractedPower);

        let expectedLowEnergyPrice = (0.546 + 0.363 + 0.34 + 0.276 + 0.227 + 0.192 + 0.166 + 0.115) * inteligenteTariff.energy_prices.low!;
        let expectedHighEnergyPrice = (0.105 + 0.104 + 0.092 + 0.078 + 0.063 + 0.059 + 0.058 + 0.057 + 0.054 + 0.053 + 0.053 + 0.052 + 0.052 + 0.052 + 0.051 + 0.051) * inteligenteTariff.energy_prices.high!;

        expectedLowEnergyPrice += (1.007 + 0.958 + 0.565 + 0.523 + 0.468 + 0.467 + 0.417 + 0.338) * inteligenteTariff.energy_prices.low!;
        expectedHighEnergyPrice += (0.279 + 0.217 + 0.215 + 0.206 + 0.2 + 0.177 + 0.141 + 0.102 + 0.077 + 0.053 + 0.052 + 0.052 + 0.05 + 0.048 + 0.048 + 0.047) * inteligenteTariff.energy_prices.high!;

        expect(result.lowEnergy.price).toBeCloseTo(expectedLowEnergyPrice, 6);
        expect(result.highEnergy.price).toBeCloseTo(expectedHighEnergyPrice, 6);
    })
})


describe('Compare tariffs', () => {
    test('All tariffs on april receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'campo.csv'), 'utf8');
        const consuptions = processCSV(content);
        const grouped = groupConsuptionsIntoDays(consuptions);

        const result = calculateAllTariffs(grouped, contractedPower);

        console.log(JSON.stringify(result));
    })
})