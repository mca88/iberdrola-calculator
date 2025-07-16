import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function HelpPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesContent = [<Slider1 />, <Slider2 />, <Slider3 />, <Slider4 />];
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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                <Button onClick={handlePrev} disabled={currentSlide === 0}>
                    <ChevronLeft />
                </Button>
                <span className="text-white">
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
    <div className="space-y-6 text-base leading-relaxed text-white">
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

const Slider2: React.FC = () => {
    return (
        <div className="space-y-6 text-base leading-relaxed text-white">
            <p>
                Una vez tengas un perfil avanzado, inicia sesión en el portal i-DE desde el siguiente enlace:{' '}
                <a
                    href="https://www.i-de.es/consumidores/web/guest/login"
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://www.i-de.es/consumidores/web/guest/login
                </a>
            </p>
            <p>
                En este portal podrás consultar información sobre tu contador, tus consumos y tus facturas. Sin embargo, lo que nos interesa es descargar el archivo CSV con tus datos de consumo.
            </p>
            <p>
                Para hacerlo, accede a la sección <strong>"Consumos por factura"</strong>, ubicada en el menú lateral izquierdo.
            </p>
            <div className="flex justify-center">
                <img
                    src="/images/ConsumosPorFactura.png"
                    alt="Captura de la sección Consumos por factura"
                    className="rounded-md border shadow-md"
                />
            </div>
        </div>
    );
};

const Slider3: React.FC = () => {
    return (
        <div className="space-y-6 text-base leading-relaxed text-white">
            <p>
                Desde la ventana de <strong>“Consumos por factura”</strong>, podrás descargar los consumos correspondientes a las facturas emitidas por Iberdrola.
                También es posible seleccionar un periodo personalizado de días.
            </p>

            <p>
                Para elegir el periodo, haz clic en el siguiente botón:
            </p>

            <div className="flex justify-center">
                <img
                    src="/images/CambiarPeriodo.png"
                    alt="Selector de fecha para el periodo de consumo"
                    className="rounded-md border shadow-md"
                />
            </div>

            <p>
                Una vez seleccionado el periodo deseado, podrás descargar un archivo CSV con el detalle del consumo diario y por horas.
                Para ello, haz clic en el siguiente icono y selecciona la opción <strong>"Descargar CSV"</strong>:
            </p>

            <div className="flex justify-center">
                <img
                    src="/images/DescargarCSV.png"
                    alt="Botón para descargar CSV"
                    className="rounded-md border shadow-md"
                />
            </div>
        </div>
    );
};

const Slider4: React.FC = () => {
    return (
        <div className="space-y-6 text-base leading-relaxed text-white">
            <p>
                Una vez descargado el archivo <code>.csv</code>, accede a la pestaña{' '}
                <a
                    href="/upload"
                    className="text-blue-600 underline"
                >
                    "Subir CSV"
                </a>
                {' '}desde el menú principal o haciendo click en el enlace.
            </p>

            <p>
                Desde ahí, deberás seleccionar el archivo CSV, asignarle un nombre e introducir la potencia contratada correspondiente
                al periodo de consumo que contiene el archivo.
            </p>

            <p>
                Una vez rellenado todo, haz clic en <strong>"Subir archivo"</strong>. Si los datos son correctos, se procesará el archivo y se analizará tu consumo automáticamente.
            </p>

            <p>
                Para visualizar el análisis de los consumos una vez subidos, accede a{' '}
                <a
                    href="/consuptions"
                    className="text-blue-600 underline"
                >
                    "Ver consumos"
                </a>{' '}
                desde el menú principal o haciendo clic en el enlace.
            </p>

            <p>
                Desde "Ver consumos", podrás comparar precios de distintos planes de luz adaptados a tus consumos.
            </p>
        </div>
    );
};


