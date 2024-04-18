import { fetchSerieDetails } from '../components/ApiFilm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { StarSerieRating } from '../components/StarRating';


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
        <div className="d-flex flex-wrap justify-content-center">
            {serie ? (
                <>
                    <Card style={{ width: '20rem' }} className="border-3 m-3">
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} />
                    </Card>
                    <Card style={{ width: '30rem' }} className="border-3 m-3">
                        <Card.Body className='bg-dark'>
                            <Card.Title className='text-white'><h1>{serie.title}</h1></Card.Title>
                            <Card.Title className='text-white'>{serie.overview}</Card.Title>
                            <Card.Title className='text-white'>{finalNote}</Card.Title>
                            <StarSerieRating serie={serie} />
                        </Card.Body>
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
                    </Card>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DetailSerieView;