export interface SingleConsuptionData {
    Fecha: Date,
    Hora: number,
    Consumo_kWh: number
}

export interface HourlyConsumption {
    Hora: number;
    Consumo_kWh: number;
}

export interface DayConsumptionData {
    Fecha: Date;
    Consumptions: HourlyConsumption[];
}