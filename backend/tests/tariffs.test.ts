import path from 'path';
import fs from 'fs'
import { groupConsuptionsIntoDays, processCSV } from '@/services/csvProcessor';
import './utils'
import { allTariffs } from '@/types/tariffs.types';
import { calculateTariff } from '@/services/calculator';

const fixturesPath = path.join(__dirname, 'fixtures')
const contractedPower = 3.45

describe('Noche tariff', () => {
    const nightTariff = allTariffs[0];

    test('may-receipt', () => {
        const content: string = fs.readFileSync(path.join(fixturesPath, 'consumo-mayo.csv'), 'utf8')
        const consuptions = processCSV(content)
        const grouped = groupConsuptionsIntoDays(consuptions)

        const result = calculateTariff(grouped, nightTariff, contractedPower);

        console.log(result)
    })
})