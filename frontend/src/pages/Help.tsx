import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function HelpPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesContent = [<Slider1 />, <Slider2 />, <Slider3 />];
    const slides = Array.from({ length: slidesContent.length }, (_, i) => `Paso ${i + 1}`);
    const totalSlides = slides.length;

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
            {/* Contenido del slider */}
            <div className="text-2xl font-semibold">
                {slidesContent[currentSlide]}
            </div>

            {/* Controles del slider */}
            <div className="flex items-center space-x-4">
                <Button onClick={handlePrev} disabled={currentSlide === 0}>
                    <ChevronLeft />
                </Button>
                <span>
                    {currentSlide + 1} / {totalSlides}
                </span>
                <Button onClick={handleNext} disabled={currentSlide === totalSlides - 1}>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
};

// Botón básico con estilos en línea
const Button: React.FC<{
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}> = ({ onClick, disabled, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-3 py-2 border rounded-md text-sm font-medium transition
        ${disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100 text-black border-gray-300 cursor-pointer"}`}
        >
            {children}
        </button>
    );
};

const Slider1: React.FC = () => (
    <div className="space-y-6 text-gray-800 text-base leading-relaxed text-white">
        <h2 className="text-2xl font-semibold ">⚠️ Importante antes de empezar</h2>

        <p>
            Para usar esta calculadora, necesitas registrarte en la web oficial de <strong>i-DE Grupo Iberdrola</strong>,
            la distribuidora eléctrica. Esta herramienta no tiene relación con dicha web.
        </p>

        <p className="font-medium">El registro requiere:</p>
        <ul className="list-disc list-inside ml-4">
            <li>CUPS de tu vivienda: {" "}
                <a href="https://www.iberdrola.es/blog/luz/cups-luz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                >
                    Cómo obtener el CUPS
                </a> 
            </li>
            <li>Teléfono móvil</li>
            <li>Documento de identidad (DNI/NIE)</li>
        </ul>

        <p>
            🔗 Puedes registrarte aquí:{" "}
            <a
                href="https://www.i-de.es/consumidores/web/guest/register?start=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
            >
                Registro en i-DE (perfil avanzado)
            </a>
        </p>

        <p className="text-red-600 font-semibold">
            Es obligatorio registrarse con el perfil <u>avanzado</u> para poder descargar los consumos en formato <code>.csv</code>.
        </p>

        <p className="bg-yellow-100 p-4 rounded text-sm text-gray-700 border border-yellow-300">
            📢 <strong>Aviso legal:</strong> los datos que introduzcas en la web de i-DE (como tu CUPS o DNI) son gestionados exclusivamente por ellos.
            Esta aplicación no tiene acceso a esos datos ni está asociada con i-DE o Iberdrola. Solo se utiliza el archivo `.csv` que tú mismo descargues.
        </p>
    </div>
);

const Slider2: React.FC = () =>
    <div className="text-2xl font-semibold">Contenido del Paso 2</div>;

const Slider3: React.FC = () =>
    <div className="text-2xl font-semibold">Contenido del Paso 3</div>;
