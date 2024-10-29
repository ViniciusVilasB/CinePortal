import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(response => response.json())
            .then(data => { setMovie(data) })
            .catch(err => console.error(err));
    }, [id]);

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

    // Função para formatar a data
    const formatReleaseDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="main" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '70vh',
            color: 'white',
        }}>
                <div className="bg-black bg-opacity-70 p-10 w-full h-full">
                {movie ? (
                    <div className="flex items-center">
                    
                        <img
                            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                            alt={movie.title}
                            className="h-96 m-16 hidden md:block"
                        />

                        <div className="flex flex-col items-center gap-4">

                            <p className="text-4xl mt-5">{movie.title}</p>

                            <p className="font-semibold text-xl">Sinopse:</p>
                            <p className="text-lg text-center">{movie.overview ? movie.overview : 'Sinopse não disponível'}</p>

                            <div className="flex items-center gap-1 font-semibold text-md">
                                <FaStar className="text-minha-cor-2" /> <span>{movie.vote_average}</span>
                            </div>

                            <p>{movie.release_date ? formatReleaseDate(movie.release_date) : 'Data não disponível'}</p>

                            <div className="mb-5 hidden md:block">
                                {trailer ? (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={trailer.replace("watch?v=", "embed/")}
                                        title={`${movie.title} Trailer`}
                                        allowFullScreen
                                    />
                                ) : (
                                    <p>Trailer não disponível</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Filme não encontrado</p>
                )}
            </div>
        </div>
    );
}
