import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const CardSerie = ({ serie, setSearch, setShowModal }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/serie/detail/${serie.id}`);
        setShowModal(false); 
        setSearch(''); 
    };

    return (
        <div className="d-flex flex-wrap justify-content-center cardStyle">
            <Card className="m-1">
                <Card.Img
                    variant="top"
                    onClick={handleClick}
                    src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`}
                    className="w-100 h-100 "
                />
            </Card>
        </div>
    );
};

export default CardSerie;
