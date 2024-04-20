import { fetchSerieDetails } from '../components/ApiFilm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { StarSerieRating } from '../components/StarRating';
import Footer from '../components/Footer';


const DetailSerieView = () => {

    const { id } = useParams();
    const [serie, setSerie] = useState([]);

    let finalNote = ((serie.vote_average) / 2).toFixed(1);

    useEffect(() => {
        const fetchDetails = async () => {
            setSerie(await fetchSerieDetails(id));
        };
        fetchDetails();
    }, [id]);

    // État pour suivre si le film est dans les favoris
    const [isInFavorites, setIsInFavorites] = useState(false);



    // Vérifier si le film est dans les favoris lors du chargement initial

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites/serie')) || {};
        setIsInFavorites(favorites[serie.id]);
    }, []);

    const addFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/serie')) || {};
        if (!favorites[serie.id]) {
            favorites[serie.id] = serie;
            localStorage.setItem('favorites/serie', JSON.stringify(favorites));
            setIsInFavorites(true); // Mettre à jour l'état pour indiquer que le film est maintenant dans les favoris
            console.log(`Film ajouté aux favoris : ${serie.title}`);
        } else {
            console.log("Le film est déjà dans la liste des favoris.");
        }
    };

    const removeFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites/serie')) || {};
        if (favorites[serie.id]) {
            delete favorites[serie.id];
            localStorage.setItem('favorites/serie', JSON.stringify(favorites));
            setIsInFavorites(false); // Mettre à jour l'état pour indiquer que le film n'est plus dans les favoris
            console.log(`Film supprimé des favoris : ${serie.title}`);
        }
    };

    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-center align-items-center  min-vh-100">
                {serie ? (
                    <div className='row col-10 col-sm-10 col-md-10 col-lg-8 d-flex justify-content-center bg-dark align-items-center rounded-3'>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-6 col-xl-6 justify-content-center p-5">
                            <div className="h-100 ">
                                <Card.Img variant="top" className='img-fluid' src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`} />
                            </div>
                        </div>
                        <div style={{ width: '30rem' }} className="border-3 m-3">
                            <Card.Body className='d-flex flex-column justify-content-center'>
                                <Card.Title className='text-white'><h2>{serie.name}</h2></Card.Title>
                                <Card.Title className='text-white'>{serie.overview}</Card.Title>
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
            <div className="row d-flex justify-content-center bg-dark">
                <Footer />
            </div>
        </div>
    );
};

export default DetailSerieView;