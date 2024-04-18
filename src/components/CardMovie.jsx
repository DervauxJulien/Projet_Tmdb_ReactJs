import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const CardMovie = ({ movie, setShowModal, setSearch}) => {

    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/film/detail/${movie.id}`);
        setShowModal(false);
        setSearch('');
    };

    return (
        <div className="d-flex flex-wrap justify-content-center cardStyle">
            <Card className="m-1">
                <Card.Img
                    variant="top"
                    onClick={handleClick}
                    src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                    className="w-100 h-100 "
                />
            </Card>
        </div>
    );
}

export default CardMovie;
