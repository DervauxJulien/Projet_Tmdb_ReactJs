import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../components/ApiFilm';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Footer from '../components/Footer';

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
        <div className='container-fluid'>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                {movie ? (
                    <div className='row col-10 col-sm-10 col-md-10 col-lg-8 d-flex justify-content-center bg-dark align-items-center rounded-3'>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-6 col-xl-6 justify-content-center p-5">
                            <div className="h-100 ">
                                <Card.Img variant="top" className='img-fluid' src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} />
                            </div>
                        </div>
                        <div style={{ width: '30rem' }} className="border-3 m-3">
                            <Card.Body className='d-flex flex-column justify-content-center'>
                                <Card.Title className='text-white'><h1>{movie.title}</h1></Card.Title>
                                <Card.Title className='text-white'>{movie.overview}</Card.Title>
                                <div className='d-flex justify-content-evenly align-items-center mt-5 text-white'>
                                    Note : {finalNote}
                                    {isInFavorites ? (
                                        <Button variant='danger' onClick={removeFavorite}>Supprimer des Favoris</Button>
                                    ) : (
                                        <Button variant='success' onClick={addFavorite}>Ajouter aux Favoris</Button>
                                    )}
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="row d-flex justify-content-center bg-body-tertiary">
                <Footer />
            </div>
        </div>
    );

};

export default DetailMovieView;
