import { DayConsumptionData } from "@/types/consuption.types";
import { allTariffs, Tariff, TariffType, TariffResult } from "@/types/tariffs.types";

export function calculateAllTariffs(days: DayConsumptionData[], contractedPower: number) {

    for (const tarif of allTariffs) {

    }
}


export function calculateTariff(days: DayConsumptionData[], tarif: Tariff, contractedPower: number): TariffResult {

    let total: TariffResult = {
        totalPower: 0,
        totalEnergy: { kwH: 0, price: 0 },
        totalPrice: 0,
        highPower: 0,
        lowPower: 0,
        highEnergy: { kwH: 0, price: 0 },
        midEnergy: { kwH: 0, price: 0 },
        lowEnergy: { kwH: 0, price: 0 },
    }
    // Calculate Power
    total.lowPower = Number((Math.round((contractedPower * days.length * tarif.power_prices.low) * 100) / 100).toFixed(2));
    total.highPower = Number((Math.round((contractedPower * days.length * tarif.power_prices.high) * 100) / 100).toFixed(2));
    total.totalPower = Number((total.lowPower + total.highPower).toFixed(2));

    // Calculate Energy
    if (tarif.type === TariffType.Noche) {
        let expensiveHourStart: number = 12;
        let expensiveHourEnd: number = 22;

        days.forEach(day => {

            // Get Noche tariff hours thresholds
            const monthN = day.Fecha.getMonth(); // 0-11
            const dayN = day.Fecha.getDate();  // 1-31
            const dateN = monthN * 100 + dayN;

            // March (2) day 30 = 230
            // Octobers (9) day 26 = 926
            if (dateN >= 230 && dateN <= 926) {
                expensiveHourStart = 13;
                expensiveHourEnd = 23;
            }

            // Start calculating price
            day.Consumptions.forEach(consuption => {
                if (consuption.Hora > expensiveHourStart && consuption.Hora <= expensiveHourEnd) {
                    total.highEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.high!);
                    total.highEnergy.kwH += consuption.Consumo_kWh;
                }
                else {
                    total.lowEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.low!);
                    total.lowEnergy.kwH += consuption.Consumo_kWh;
                }
            });
        });
    }
    else if (tarif.type === TariffType.TresPeriodos) {

        // Get 3 Periodos tariff hours thresholds
        const LowRange: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        const MidRange: number[] = [9, 10, 15, 16, 17, 18, 23, 24];
        const HighRange: number[] = [11, 12, 13, 14, 19, 20, 21, 22];

        days.forEach(day => {
            let isWeekend = (day.Fecha.getDate() === 0 || day.Fecha.getDate() === 6);

            // Start calculating price
            day.Consumptions.forEach(consuption => {
                if (isWeekend || LowRange.includes(consuption.Hora)) {
                    total.lowEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.low!);
                    total.lowEnergy.kwH += consuption.Consumo_kWh;
                }
                else if (MidRange.includes(consuption.Hora)) {
                    total.midEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.mid!);
                    total.midEnergy.kwH += consuption.Consumo_kWh;
                }
                else if (HighRange.includes(consuption.Hora)) {
                    total.highEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.high!);
                    total.highEnergy.kwH += consuption.Consumo_kWh;
                }
                else {
                    console.log("-----NUNCA SE DEBE LLEGAR AQUÍ-----");
                }
            });
        });
    }
    else if (tarif.type === TariffType.Inteligente) {

    }
    total.totalEnergy.kwH = total.lowEnergy.kwH + total.midEnergy.kwH + total.highEnergy.kwH;
    total.totalEnergy.price = total.lowEnergy.price + total.midEnergy.price + total.highEnergy.price;
    total.totalPrice = total.totalEnergy.price + total.totalPower;

    return total
}