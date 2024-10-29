import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ id, title, poster_path }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            key={id} 
            className="flex flex-col text-center items-center flex-shrink-0 relative hover:scale-105" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/movies/${id}`}>
                <img 
                    src={`https://image.tmdb.org/t/p/w342${poster_path}`} 
                    alt={title} 
                    className="w-[130px] h-[200px] mt-3 cursor-pointer transition ease-in-out duration-300 rounded-lg" 
                />
            </Link>
            <div className="overflow-hidden max-w-[130px]">
                <h3 
                    className={`mt-2 text-lg font-semibold ${isHovered ? 'line-clamp-none' : 'line-clamp-2'}`}
                >
                    {title}
                </h3>
            </div>
        </div>
    );
}
