import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { FirestoreConsumption } from "@/types/consuptions.types";

export function ResultModal({
    selected,
    setSelected,
}: {
    selected: FirestoreConsumption | null;
    setSelected: (val: null) => void;
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!selected) return null;

    const activeResult = selected.results[activeIndex];
    const { result } = activeResult;

    const energyData = [
        { name: "Energía Cara", value: Number(result.highEnergy.price.toFixed(2)) },
        { name: "Energía Media", value: Number(result.midEnergy.price.toFixed(2)) },
        { name: "Energía Barata", value: Number(result.lowEnergy.price.toFixed(2)) },
    ];

    const powerData = [
        { name: "Potencia Cara", value: Number(result.highPower.toFixed(2)) },
        { name: "Potencia Barata", value: Number(result.lowPower.toFixed(2)) },
    ];

    return (
        <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
            <DialogContent className="dark text-white sm:max-w-[700px] w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">{selected.name}</DialogTitle>
                </DialogHeader>

                {/* Tarifa selector */}
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {selected.results.map((r, index) => (
                        <Button
                            key={r.tariffType}
                            variant={index === activeIndex ? "default" : "secondary"}
                            onClick={() => setActiveIndex(index)}
                            className="text-sm px-4 cursor-pointer"
                        >
                            {r.tariffType}
                        </Button>
                    ))}
                </div>

                {/* Panel de resultados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-6">
                    {/* Potencia */}
                    <div>
                        <h3 className="font-semibold mb-2 text-center">Distribución Potencia (€)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={powerData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    innerRadius={40}
                                    label
                                >
                                    <Cell fill="#ef4444" /> {/* Rojo - Cara */}
                                    <Cell fill="#4ade80" /> {/* Verde - Barata */}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="text-center mt-2 font-medium">
                            Total: {result.totalPower.toFixed(2)} €
                        </p>
                    </div>

                    {/* Energía */}
                    <div>
                        <h3 className="font-semibold mb-2 text-center">Distribución Energía (€)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={energyData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    innerRadius={40}
                                    label
                                >
                                    {/* Colores personalizados */}
                                    <Cell fill="#ef4444" /> {/* Rojo - Cara */}
                                    <Cell fill="#facc15" /> {/* Amarillo - Media */}
                                    <Cell fill="#4ade80" /> {/* Verde - Barata */}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="text-center mt-2 font-medium">
                            Total: {result.totalEnergy.price.toFixed(2)} €
                        </p>
                    </div>
                </div>

                {/* Precio total */}
                <div className="mt-6 text-center text-lg font-semibold">
                    Precio total: {result.totalPrice.toFixed(2)} €
                </div>
            </DialogContent>
        </Dialog>
    );
}
