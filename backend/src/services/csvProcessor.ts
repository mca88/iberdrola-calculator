import Papa from 'papaparse'
import { ConsuptionDayData } from '@/types/csv.types'

export function processCSV(csvContent: string): ConsuptionDayData[] {

    const parseResult = Papa.parse(csvContent, {
        delimiter: ';',
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transformHeader: (header: string) => header.trim(),
    })

    if (parseResult.errors && parseResult.errors.length > 0) {
        throw new Error(`Error al parsear el CSV: ${parseResult.errors.map(e => e.message).join(', ')}`);
    }

    const data = parseResult.data as Record<string, any>[];

    if (!data || data.length === 0) {
        throw new Error('El CSV está vacío o no contiene datos válidos');
    }

    const headers = Object.keys(data[0]);
    const requiredColumns = ['Fecha', 'Hora', 'Consumo_kWh'];
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));

    if (missingColumns.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingColumns.join(', ')}. Los campos obligatorios son: ${headers.join(', ')}`);
    }

    const consumptionData: ConsuptionDayData[] = data.map((row, index) => {

        if (!row.Fecha ||
            row.Hora === undefined || row.Hora === null || row.Hora === '' ||
            row.Consumo_kWh === undefined || row.Consumo_kWh === null || row.Consumo_kWh === '') {

            throw new Error(`Fila ${index + 1}: Faltan datos en campos requeridos (Fecha, Hora, o Consumo_kWh)`);
        }

        // Convertir el consumo a número
        const consumo = parseFloat(row.Consumo_kWh);
        if (isNaN(consumo)) {
            throw new Error(`Fila ${index + 1}: El valor de Consumo_kWh '${row.Consumo_kWh}' no es un número válido`);
        }

        // Validar formato básico de fecha (opcional, puedes hacer validaciones más estrictas)
        const hora = parseInt(row.Hora);
        if (isNaN(consumo)) {
            throw new Error(`Fila ${index + 1}: El valor de Consumo_kWh '${row.Consumo_kWh}' no es un número válido`);
        }

        const fechaStr: string = row.Fecha.toString().trim();

        if (fechaStr.length === 0) {
            throw new Error(`Fila ${index + 1}: La fecha está vacía`);
        }

        return {
            Fecha: fechaStr,
            Hora: hora,
            Consumo_kWh: consumo
        };
    });

    return consumptionData;
}