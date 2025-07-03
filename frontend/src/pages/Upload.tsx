import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

export default function CSVUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [customName, setCustomName] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.name.endsWith(".csv")) {
            setFile(selectedFile);
        } else {
            alert("Solo se permiten archivos .csv");
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Selecciona un archivo .csv");
        if (!customName) return alert("Dale un nombre al archivo");

        setUploading(true);

        // Aquí podrías subirlo a Firebase o a tu API
        // Simulación de espera
        setTimeout(() => {
            alert(`Archivo "${customName}" subido correctamente`);
            setFile(null);
            setCustomName("");
            setUploading(false);
        }, 1500);
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded-2xl border">
            <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Subir archivo CSV</h2>

                <div className="space-y-2">
                    <Label htmlFor="csvFile">Archivo CSV</Label>
                    <Input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="customName">Nombre del archivo</Label>
                    <Input
                        id="customName"
                        placeholder="Ej: consumo-junio"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleUpload}
                    disabled={!file || !customName || uploading}
                    className="w-full flex items-center gap-2 cursor-pointer"
                >
                    <UploadCloud className="w-4 h-4" />
                    {uploading ? "Subiendo..." : "Subir archivo"}
                </Button>
            </CardContent>
        </Card>
    );
};
