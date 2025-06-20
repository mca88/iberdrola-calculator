import Papa from 'papaparse'
import { parse, isValid, format } from 'date-fns'
import { DayConsumptionData, HourlyConsumption, SingleConsuptionData } from '@/types/consuption.types'
import { parsedDate } from '@/utils/dates';

export function processCSV(csvContent: string): SingleConsuptionData[] {

    const parseResult = Papa.parse(csvContent, {
        delimiter: ';',
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
    })

    if (parseResult.errors && parseResult.errors.length > 0) {
        throw new Error(`Error al parsear el CSV: ${parseResult.errors.map((e) => {
            const fila = e.row != null ? `Línea ${e.row + 1}` : '-';
            return `\n${fila}: ${e.message}`;
        }).join(', ')}`);
    }

    const data = parseResult.data as Record<string, any>[];

    if (!data || data.length === 0) {
        throw new Error('El CSV está vacío o no contiene datos válidos');
    }

    const headers = Object.keys(data[0]);
    const requiredColumns = ['Fecha', 'Hora', 'Consumo_kWh'];
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));

    if (missingColumns.length > 0) {
        throw new Error(`Cabeceras requeridas faltantes: ${missingColumns.join(', ')}. Las cabeceras obligatorias son: Fecha, Hora, Consumo_kWh`);
    }

    const consumptionData: SingleConsuptionData[] = data.map((row, index) => {
        if (row.Fecha === undefined || row.Fecha === null || row.Fecha === '') {
            throw new Error(`Fila ${index + 1}: Faltan datos en el campo de la fecha`);
        }

        if (row.Hora === undefined || row.Hora === null || row.Hora === '') {
            throw new Error(`Fila ${index + 1}: Faltan datos en el campo de la hora`);
        }

        if (row.Consumo_kWh === undefined || row.Consumo_kWh === null || row.Consumo_kWh === '') {
            throw new Error(`Fila ${index + 1}: Faltan datos en el campo del consumo`);
        }

        // Convertir el consumo a número
        const consumption = parseFloat(row.Consumo_kWh.replace(',', '.'));
        if (isNaN(consumption)) {
            throw new Error(`Fila ${index + 1}: El valor de Consumo_kWh no es un número válido`);
        }

        // Convertir la hora a número
        const hour = parseInt(row.Hora);
        if (isNaN(hour)) {
            throw new Error(`Fila ${index + 1}: El valor de la hora no es un número válido`);
        }
        if (hour < 1 || hour > 24) {
            throw new Error(`Fila ${index + 1}: El valor de la hora debe estar entre 1 y 24`);
        }

        // Validar y convertir la fecha
        const dateStr: string = row.Fecha.toString().trim();
        const dateFormat = 'dd/MM/yyyy'
        const date: Date = parsedDate(dateStr)

        if (!isValid(date) || format(date, dateFormat) !== dateStr) {
            throw new Error(`Fila ${index + 1}: La fecha no es válida o tiene un formato incorrecto`);
        }

        return {
            Fecha: date,
            Hora: hour,
            Consumo_kWh: consumption
        };
    });

    return consumptionData;
}

export function groupConsuptionsIntoDays(listOfConsuptions: SingleConsuptionData[]): DayConsumptionData[] {

    const groupedByDate = new Map<string, HourlyConsumption[]>();

    for (const consuption of listOfConsuptions) {
        const dateKey = consuption.Fecha.toDateString()
        const hourlyConsuption: HourlyConsumption = {
            Hora: consuption.Hora,
            Consumo_kWh: consuption.Consumo_kWh
        };

        if (groupedByDate.has(dateKey)) {
            groupedByDate.get(dateKey)?.push(hourlyConsuption)
        }
        else {
            groupedByDate.set(dateKey, [hourlyConsuption])
        }
    }

    const result: DayConsumptionData[] = [];

    for (const [dateKey, consumptions] of groupedByDate) {
        result.push({
            Fecha: new Date(dateKey),
            Consumptions: consumptions.sort((a, b) => a.Hora - b.Hora)
        })
    }

    return result.sort((a, b) => a.Fecha.getTime() - b.Fecha.getTime());
}