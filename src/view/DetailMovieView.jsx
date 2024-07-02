

// Importation du hook useParams pour récupérer le paramètre ID dans l'URL
import { useParams } from 'react-router-dom'; 
import { fetchMovieDetails } from '../components/ApiFilm';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Footer from '../components/Footer';

const DetailMovieView = () => {
    const { id } = useParams(); // Je récupère l'ID du film depuis le paramètre de l'URL
    const [movie, setMovie] = useState(null);
    const [isInFavorites, setIsInFavorites] = useState(false);

// Calcul de la note finale du film divisé par 2 pour noter sur 5
    const finalNote = ((movie?.vote_average || 0) / 2).toFixed(1); 
//  Je charge les détails du film depuis l'API lors du changement de l'ID
    useEffect(() => {
        const fetchDetails = async () => {
            const movieData = await fetchMovieDetails(id);
            setMovie(movieData); // Mise à jour de l'état avec les données du film récupérées
        };
        fetchDetails(); 
    }, [id]); // changement de l'ID pour recharger les détails du film

 // Je vérifie si le film est dans les favoris lors de chaque changement
    useEffect(() => {
        // Récupération des favoris depuis le localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
        // Mise à jour de l'état isInFavorites en fonction de la présence du film dans les favoris
        setIsInFavorites(favorites[movie?.id]);
    }, [movie]);

        // Fonction pour ajouter le film aux favoris
    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
         // Vérification si le film n'est pas déjà dans les favoris
        if (!favorites[movie?.id]) {
            // Ajout du film aux favoris
            favorites[movie?.id] = movie;
            // Mise à jour des favoris dans le localStorage
            localStorage.setItem('favorites/movie', JSON.stringify(favorites));
            setIsInFavorites(true);
        }
    };

 // Fonction pour supprimer le film des favoris
    const removeFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
        if (favorites[movie?.id]) {
            delete favorites[movie?.id];
            localStorage.setItem('favorites/movie', JSON.stringify(favorites));
            setIsInFavorites(false);
        }
    };

    return (
        <div className="container-fluid h-100">
            <div className="d-flex justify-content-center pt-3">
                <h1>Description du film</h1>
            </div>
             {/* Vérification si les détails du film sont chargés */}
            {movie ? ( 
                <div className="row col-12 col-md-10 col-lg-8 m-auto h-100">
                    <div className="col-12 col-md-4 p-3">
                        <Card.Img variant="top" className="img-fluid" src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} />
                    </div>
                    <div className="col-12 col-md-8 p-3">
                        <Card.Body className="border-3 text-white">
                            <Card.Title><h2>{movie.title}</h2></Card.Title>
                            <Card.Text>{movie.overview}</Card.Text>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div className="text-white">Note : {finalNote}</div>
                                <div>
                                    {isInFavorites ? (
                                        <Button variant="danger" onClick={removeFavorite}>Supprimer des Favoris</Button>
                                    ) : (
                                        <Button variant="success" onClick={addFavorite}>Ajouter aux Favoris</Button>
                                    )}
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            ) : (
                <p className="text-center">Chargement...</p> 
            )}
            <div className="row d-flex justify-content-center bg-dark">
                <Footer />
            </div>
        </div>
    );
};

export default DetailMovieView;
