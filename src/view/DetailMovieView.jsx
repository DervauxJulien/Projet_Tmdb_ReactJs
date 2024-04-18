import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../components/ApiFilm';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { StarMovieRating } from '../components/StarRating';

const DetailMovieView = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    let finalNote = ((movie.vote_average) / 2).toFixed(1);

    useEffect(() => {
        const fetchDetails = async () => {
            setMovie(await fetchMovieDetails(id));
        };
        fetchDetails();
    }, [id]);

    // État pour suivre si le film est dans les favoris
    const [isInFavorites, setIsInFavorites] = useState(false);

    // Vérifier si le film est dans les favoris lors du chargement initial
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
        setIsInFavorites(favorites[movie.id]);
    }, []);

    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
        if (!favorites[movie.id]) {
            favorites[movie.id] = movie;
            localStorage.setItem('favorites/movie', JSON.stringify(favorites));
            setIsInFavorites(true); // Mettre à jour l'état pour indiquer que le film est maintenant dans les favoris
            console.log(`Film ajouté aux favoris : ${movie.title}`);
        } else {
            console.log("Le film est déjà dans la liste des favoris.");
        }
    };

    const removeFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/movie')) || {};
        if (favorites[movie.id]) {
            delete favorites[movie.id];
            localStorage.setItem('favorites/movie', JSON.stringify(favorites));
            setIsInFavorites(false); // Mettre à jour l'état pour indiquer que le film n'est plus dans les favoris
            console.log(`Film supprimé des favoris : ${movie.title}`);
        }
    };

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {movie ? (
                <>
                    <Card style={{ width: '20rem' }} className="border-3 m-3">
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    </Card>
                    <Card style={{ width: '30rem' }} className="border-3 m-3">
                        <Card.Body className='bg-dark'>
                            <Card.Title className='text-white'><h1>{movie.title}</h1></Card.Title>
                            <Card.Title className='text-white'>{movie.overview}</Card.Title>
                            <Card.Title className='text-white'>{finalNote}</Card.Title>
                            <StarMovieRating movie={movie} />
                        
                        {/* Utiliser la variable d'état pour afficher dynamiquement le lien d'ajout ou de suppression */}
                        {isInFavorites ? (
                            <img
                                src="addfav.svg"
                                alt="Remove from favorites"
                                className="position-absolute bottom-0 start-50 translate-middle-x m-3 "// Utilisation de position-absolute pour positionner l'icône en bas à droite
                                onClick={removeFavorite}
                                style={{}}
                            />
                        ) : (
                            <img
                                src="removefav.svg"
                                alt="Add to favorites"
                                className="position-absolute bottom-0 start-50 translate-middle-x m-3" // Utilisation de position-absolute pour positionner l'icône en bas au centre
                                onClick={addFavorite}
                                style={{ cursor: "pointer" }}
                            />
                        )}
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DetailMovieView;
