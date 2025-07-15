
// Representa una entrada en Firestore -> users/{userId}/consumptions/{docId}
export interface FirestoreConsumption {
    createdAt: string | number | Date;
    name: string;
    power: number;
    results: Result[];
}

interface Result {
    tariffType: string;
    result: TariffResult;
}

export interface TariffResult {
    totalPower: number;
    totalEnergy: EnergyResult;
    totalPrice: number;
    highPower: number;
    lowPower: number;
    highEnergy: EnergyResult;
    midEnergy: EnergyResult;
    lowEnergy: EnergyResult;
}

interface EnergyResult {
    kwH: number;
    price: number;
}
