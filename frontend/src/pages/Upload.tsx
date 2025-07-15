import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, LoaderCircle, UploadCloud } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { uploadCSV } from "@/services/csvService";

export default function CSVUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [customName, setCustomName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [power, setPower] = useState("")
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.name.endsWith(".csv")) {
            setFile(selectedFile);
            setCustomName(selectedFile.name.split('.')[0])
        } else {
            alert("Solo se permiten archivos .csv");
            setFile(null);
            setCustomName("");
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Selecciona un archivo .csv");
        if (!customName) return alert("Dale un nombre al archivo");
        setUploading(true);

        try {
            const response = await uploadCSV(file, customName, power);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setCustomName("");
            alert(response.message || "Subida completada");
        } catch (error: any) {
            const backendMessage = error?.message || "Error inesperado al subir el archivo";
            alert(backendMessage);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded-2xl border">
            <CardContent className="space-y-4">

                <div className="space-y-2">
                    <Input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                        ref={fileInputRef}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <Label htmlFor="customName">Nombre del archivo</Label>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                El nombre que tendrá el archivo al guardarse en consumos.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="customName"
                        placeholder="Ej: consumo-junio"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-1">
                        <Label htmlFor="contractedPower">Potencia contratada</Label>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Puedes comprobar tu potencia contratada en la factura digital de Iberdrola.
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="contractedPower"
                        placeholder="Ej: 3.45"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleUpload}
                    disabled={!file || !customName || uploading || !power}
                    className="w-full flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                    {uploading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Subiendo...
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-4 h-4" />
                            Subir archivo
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};
