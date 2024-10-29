import { useRef, useEffect, useState } from "react";

export default function ContainerMovies({ titulo, children }) {
    const carouselRef = useRef(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Duplica os elementos para o carrossel infinito
        setItems([children, children]);
    }, [children]);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        // Se chegar ao final da lista, reseta a rolagem

        if (scrollLeft <= 0) {
            carouselRef.current.scrollTo({ left: scrollWidth / 2, behavior: 'smooth' });
        } else if (scrollLeft >= scrollWidth - clientWidth) {
            carouselRef.current.scrollTo({ left: scrollWidth / 2 - clientWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="my-10 relative w-full">
            <h2 className="text-3xl font-bold mb-5">{titulo}</h2>

            <button
                onClick={scrollLeft}
                className="absolute left-2 top-36 text-2xl transform bg-minha-cor-2 h-12 w-12 rounded-full z-10 text-white hover:bg-minha-cor-1"
            >
                &#8249;
            </button>
            <div
                ref={carouselRef}
                className="flex overflow-hidden scroll-smooth w-full space-x-4"
                onScroll={handleScroll}
            >
                {items}
            </div>
                
            <button
                onClick={scrollRight}
                className="absolute right-2 top-36 text-2xl transform bg-minha-cor-2 h-12 w-12 rounded-full z-10 text-white hover:bg-minha-cor-1"
            >
                &#8250;
            </button>
        </div>
    );
}
