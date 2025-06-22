type Energy = "low" | "mid" | "high"
type Power = "low" | "high"

interface EnergyResult {
    kwH: number;
    price: number;
}

export interface TariffResult {
    totalPower: number;
    lowPower: number;
    highPower: number;
    totalEnergy: EnergyResult;
    lowEnergy: EnergyResult;
    midEnergy: EnergyResult;
    highEnergy: EnergyResult;
}

export type Tariff = {
    type: TariffType
    power_prices: Record<Power, number>,
    energy_prices: Record<Energy, number | null>
}

export enum TariffType {
    Noche = "Noche",
    TresPeriodos = "TresPeriodos",
    Inteligente = "Inteligente"
}

export const allTariffs: Tariff[] = [
    {
        type: TariffType.Noche,
        power_prices: { low: 0.003, high: 0.097232 },
        energy_prices: { low: 0.11613, mid: null, high: 0.170782 }
    },
    {
        type: TariffType.TresPeriodos,
        power_prices: { low: 0.013014, high: 0.086301 },
        energy_prices: { low: 0.090904, mid: null, high: 0.175576 }
    },
    {
        type: TariffType.Inteligente,
        power_prices: { low: 0.046548, high: 0.108192 },
        energy_prices: { low: 0.123500, mid: null, high: 0.247000 }
    }
]