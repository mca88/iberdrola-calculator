import { DayConsumptionData } from "@/types/consuption.types";
import { allTariffs, Tariff, TariffType, TariffResult } from "@/types/tariffs.types";

export function calculateAllTariffs(days: DayConsumptionData[], contractedPower: number) {

    for (const tarif of allTariffs) {

    }
}


export function calculateTariff(days: DayConsumptionData[], tarif: Tariff, contractedPower: number): TariffResult {

    let total: TariffResult = {
        totalPower: 0,
        lowPower: 0,
        highPower: 0,
        totalEnergy: { kwH: 0, price: 0 },
        lowEnergy: { kwH: 0, price: 0 },
        midEnergy: { kwH: 0, price: 0 },
        highEnergy: { kwH: 0, price: 0 }
    }
    const numberOfDays = days.length;

    // Calculate Power

    total.lowPower = Number((Math.round((contractedPower * numberOfDays * tarif.power_prices.low) * 100) / 100).toFixed(2))
    total.highPower = Number((Math.round((contractedPower * numberOfDays * tarif.power_prices.high) * 100) / 100).toFixed(2))

    // console.log(`LOWPOWER: ${total.lowPower}\nHIGHPOWER: ${total.highPower}`)
    total.totalPower = Number((total.lowPower + total.highPower).toFixed(2));

    // Calculate Energy
    if (tarif.type === TariffType.Noche) {
        let expensiveHourStart: number = 12;
        let expensiveHourEnd: number = 22;

        days.forEach(day => {

            // Get nigth tariff hours threshold
            const monthN = day.Fecha.getMonth(); // 0-11
            const dayN = day.Fecha.getDate();  // 1-31
            const dateN = monthN * 100 + dayN;

            // March (2) day 30 = 230
            // Octobers (9) day 28 = 928
            if (dateN >= 230 && dateN <= 928) {
                expensiveHourStart = 13;
                expensiveHourEnd = 23;
            }

            // Start calculating price
            day.Consumptions.forEach(consuption => {
                if (consuption.Hora > expensiveHourStart && consuption.Hora <= expensiveHourEnd) {
                    total.highEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.high!);
                    total.highEnergy.kwH += consuption.Consumo_kWh
                }
                else {
                    total.lowEnergy.price += (consuption.Consumo_kWh * tarif.energy_prices.low!);
                    total.lowEnergy.kwH += consuption.Consumo_kWh
                }
            })
        });
        total.totalEnergy.kwH = total.lowEnergy.kwH + total.highEnergy.kwH
        total.totalEnergy.price = total.lowEnergy.price + total.highEnergy.price
    }
    else if (tarif.type === TariffType.TresPeriodos) {

    }
    else if (tarif.type === TariffType.Inteligente) {

    }

    return total
}