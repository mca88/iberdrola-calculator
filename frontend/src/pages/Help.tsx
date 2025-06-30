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

const Slider1: React.FC = () =>
    <div className="text-2xl font-semibold">Contenido del Paso 1</div>;

const Slider2: React.FC = () =>
    <div className="text-2xl font-semibold">Contenido del Paso 2</div>;

const Slider3: React.FC = () =>
    <div className="text-2xl font-semibold">Contenido del Paso 3</div>;
