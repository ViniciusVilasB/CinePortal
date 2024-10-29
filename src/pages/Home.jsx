import { useEffect, useState } from "react";
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const fetchMovies = async () => {
        try {

            const today = new Date();
            const minDate = today.toISOString().split('T')[0]; // Data atual
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 10); // 10 dias depois
            const formattedMaxDate = maxDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

            const popularURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
            const upcomingURL = `${BASE_URL}/discover/movie${API_KEY}&language=pt-br&release_date.gte=${minDate}&release_date.lte=${formattedMaxDate}`;
            const topRatedURL = `${BASE_URL}/discover/movie${API_KEY}&language=pt-br&page=1&sort_by=vote_average.desc&vote_count.gte=200`;

            const [popularResponse, upcomingResponse, topRatedResponse] = await Promise.all([
                fetch(popularURL),
                fetch(upcomingURL),
                fetch(topRatedURL)
            ]);

            const popularData = await popularResponse.json();
            const upcomingData = await upcomingResponse.json();
            const topRatedData = await topRatedResponse.json();

            setPopularMovies(popularData.results);
            setUpcomingMovies(upcomingData.results);
            setTopRatedMovies(topRatedData.results);
        } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    return (
        <div className="main">
            {loading ? <p className="text-3xl">Carregando...</p> :
                <>
                    <h1 className="text-4xl font-bold">Página Home</h1>

                    <ContainerMovies titulo="Filmes Populares">
                        {
                            popularMovies.map(movie => (
                                <MovieCard key={movie.id} {...movie} />
                            ))
                        }
                    </ContainerMovies>

                    <ContainerMovies titulo="Lançamentos">
                        {
                            upcomingMovies.map(movie => (
                                <MovieCard key={movie.id} {...movie} />
                            ))
                        }
                    </ContainerMovies>

                    <ContainerMovies titulo="Melhor avaliados">
                        {
                            topRatedMovies.map(movie => (
                                <MovieCard key={movie.id} {...movie} />
                            ))
                        }
                    </ContainerMovies>
                </>
            }
        </div>
    )
}
