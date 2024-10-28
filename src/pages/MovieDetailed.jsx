import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaStar, FaCoins } from "react-icons/fa";

export default function MovieDetailPage(){
    
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [revenueInBRL, setRevenueInBRL] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const exchangeRate = 5;

    useEffect(() => {
        if (movie.revenue) {
            const convertedRevenue = movie.revenue * exchangeRate;
            setRevenueInBRL(convertedRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        }
    }, [movie.revenue]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
        .then(response => response.json())
        .then(data => {setMovie(data)})
        .catch(err => console.error(err));

    }, []);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const trailerURL = data.results[0].key;
                setTrailer(`https://www.youtube.com/watch?v=${trailerURL}`);
            }
        })
        .catch(err => console.error(err));
    }, [id]);

    return(
        <div className="main">
        {
            movie ?
                <>
                    <div
                        className="w-full h-[30vh] md:h-[80vh] bg-cover bg-center"
                        style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                        }}
                    ></div>

                    {/* <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.title} className="" /> */}

                    <p className="text-3xl">{movie.title}</p>

                    <p className="font-semibold text-xl">Sinopse:</p>
                    <p className="text-lg text-center">{movie.overview ? movie.overview : 'Sinopse não disponível'}</p>

                    <div className="flex items-center gap-1 font-semibold text-md">
                        <FaStar className="text-minha-cor-2" />  <span> {movie.vote_average}</span>
                    </div>

                    <div>
                                { trailer ?  <iframe
                                width="560"
                                height="315"
                                src={trailer.replace("watch?v=", "embed/")} 
                                title={`${movie.title} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                /> :
                                <p>Trailer não disponível</p>}
                            </div>
                </>
            : <p>Filme não encontrado</p>
        }
        </div>
    )
}