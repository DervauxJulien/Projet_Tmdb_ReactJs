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
        <div className="d-flex flex-wrap justify-content-center vh-100 ">
            {serie ? (
                <>
                    <Card style={{ width: '30rem' }} className="border-3 m-3">
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`} />
                    </Card>
                    <Card style={{ width: '30rem' }} className="border-3 m-3">
                        <Card.Body className='bg-dark'>
                            <Card.Title className='text-white'><h1>{serie.name}</h1></Card.Title>
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
                    </Card>
                </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
        
        
    );
};

export default DetailSerieView;