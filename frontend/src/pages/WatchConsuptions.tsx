import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "@/config";
import type { FirestoreConsumption } from "@/types/consuptions.types";
import { SimpleTable, } from "@/components/ui/ConsuptionsTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { ResultModal } from "@/components/ResultsModal";

export default function WatchConsuptions() {
    const [rows, setRows] = useState<FirestoreConsumption[]>([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<FirestoreConsumption | null>(null)

    useEffect(() => {
        const fetchConsumptions = async () => {
            const user = auth.currentUser
            if (!user) return

            const db = getFirestore()
            const consumptionsRef = collection(db, "users", user.uid, "consumptions")
            const snapshot = await getDocs(consumptionsRef)

            const data: FirestoreConsumption[] = snapshot.docs.map((doc) => {
                const raw = doc.data() as FirestoreConsumption
                return {
                    name: raw.name,
                    power: raw.power,
                    createdAt: new Date(raw.createdAt).toLocaleString(),
                    results: raw.results
                }
            })

            setRows(data)
            setLoading(false)
        }

        fetchConsumptions()
    }, [])

    const columns: ColumnDef<FirestoreConsumption>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "createdAt",
            header: "Fecha",
        },
        {
            accessorKey: "power",
            header: "Potencia (kW)",
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const data = row.original
                return (
                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={() => setSelected(data)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={() => console.log("Eliminar", data)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-white">Cargando consumos...</p>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-4xl p-4 text-white">
                <SimpleTable columns={columns} data={rows} />
                <ResultModal selected={selected} setSelected={setSelected} />
            </div>
        </div>
    )
}