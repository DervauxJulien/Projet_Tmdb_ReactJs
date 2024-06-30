import { useNavigate } from "react-router-dom"; // Import du hook useNavigate depuis react-router-dom
import { Card } from "react-bootstrap"; // Import du composant Card depuis react-bootstrap

const CardMovie = ({ movie, setShowModal, setSearch}) => {
    const navigate = useNavigate(); // Initialisation du hook useNavigate

    const handleClick = () => {
        navigate(`/film/detail/${movie.id}`); // Navigation vers la page de détail du film avec l'ID du film
        setShowModal(false); // Fermeture du modal
        setSearch(''); // Réinitialisation de la barre de recherche
    };

    return (
        <div className="d-flex flex-wrap justify-content-center cardStyle">
            <Card className="m-1 border-0">
                <Card.Img
                    variant="top"
                    onClick={handleClick}
                    src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                    className="w-100 h-100"
                />
            </Card>
        </div>
    );
}

export default CardMovie;

