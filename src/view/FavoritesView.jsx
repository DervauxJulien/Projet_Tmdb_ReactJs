
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const FavoritesView = () => {
  // Déclaration des états pour stocker les favoris des films et des séries
  const [movieFavorites, setMovieFavorites] = useState([]);
  const [serieFavorites, setSerieFavorites] = useState([]);

  // Fonction pour supprimer un favori
  const removeFavorite = (type, id) => {
    // Récupération des favoris actuels du localStorage si vide je crée un objet vide
    const favorites = JSON.parse(localStorage.getItem(`favorites/${type}`)) || {};
    // Création d'une copie de l'objet  mis à jour sans l'élément à supprimer
    const updatedFavorites = { ...favorites };
    // je supprime la clé de cet id
    delete updatedFavorites[id];
    // Je met à jour le localStorage avec les favoris mis à jour
    localStorage.setItem(`favorites/${type}`, JSON.stringify(updatedFavorites));

    if (type === "movie") {
      setMovieFavorites(Object.values(updatedFavorites));
    } else {
      setSerieFavorites(Object.values(updatedFavorites));
    }
  };

  // J'utilise useEffect pour charger les favoris à partir du localStorage lors du montage de mon composant
  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('favorites/movie')) || {};
    const serieFavs = JSON.parse(localStorage.getItem('favorites/serie')) || {};
    setMovieFavorites(Object.values(movieFavs));
    setSerieFavorites(Object.values(serieFavs));
  }, []);

  return (
    <div className="container-fluid vh-100">
      {/* Titre de la page */}
      <h1 className="d-flex justify-content-center p-5">Mes Favoris</h1>
      <div className="d-flex flex-wrap justify-content-center min-vh-100">
        {/* Affichage des favoris de films */}
        {movieFavorites.map((movie) => (
          <div key={movie.id} className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center rounded-3 m-2'>
            <div className="col-12 d-flex justify-content-center p-1 border rounded-4 h-100">
              <div className="border-3 d-flex bg-black flex-column align-items-center">
                <Card.Img 
                  style={{ width: '100%', height: 'auto', maxWidth: '20rem' }} 
                  variant="top" 
                  className='img-fluid p-3' 
                  src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} 
                />
                <Card.Body className='d-flex flex-column justify-content-center'>
                  <Card.Title className='text-white text-center'>
                    <h2>{movie.title}</h2>
                  </Card.Title>
                  <Card.Text className='text-white text-center'>
                    {movie.overview}
                  </Card.Text>
                  <div className='d-flex justify-content-center align-items-center mt-3 text-white'>
                    <Button variant='danger' onClick={() => removeFavorite("movie", movie.id)}>Supprimer des favoris</Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          </div>
        ))}
        {serieFavorites.map((serie) => (
          <div key={serie.id} className='col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center rounded-3 m-2'>
            <div className="col-12 d-flex justify-content-center p-1 border rounded-4 h-100">
              <div className="border-3 d-flex bg-black flex-column align-items-center">
                <Card.Img 
                  style={{ width: '100%', height: 'auto', maxWidth: '20rem' }} 
                  variant="top" 
                  className='img-fluid p-3 ' 
                  src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`} 
                />
                <Card.Body className='d-flex flex-column justify-content-center'>
                  <Card.Title className='text-white text-center'>
                    <h2>{serie.name}</h2>
                  </Card.Title>
                  <Card.Text className='text-white text-center'>
                    {serie.overview}
                  </Card.Text>
                  <div className='d-flex justify-content-center align-items-center mt-3 text-white'>
                    <Button variant='danger' onClick={() => removeFavorite("serie", serie.id)}>Supprimer des favoris</Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center bg-dark">
        <Footer />
      </div>
    </div>
  );
};

export default FavoritesView;

