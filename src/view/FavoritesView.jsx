import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const FavoritesView = () => {
  
  // State pour stocker les favoris des films
  const [movieFavorites, setMovieFavorites] = useState([]);
  // State pour stocker les favoris des séries
  const [serieFavorites, setSerieFavorites] = useState([]);

  // Fonction pour supprimer un film des favoris
  const removeFavorite = (type, id) => {
    // Récupérer les favoris du stockage local en fonction du type (film ou série)
    const favorites = JSON.parse(localStorage.getItem(`favorites/${type}`)) || {};
    // Créer une copie des favoris
    const updatedFavorites = { ...favorites };
    // Supprimer le favori avec l'ID donné
    delete updatedFavorites[id];
    // Mettre à jour les favoris dans le stockage local
    localStorage.setItem(`favorites/${type}`, JSON.stringify(updatedFavorites));

    // Mettre à jour l'état des favoris en fonction du type
    if (type === "movie") {
      setMovieFavorites(Object.values(updatedFavorites));
    } else {
      setSerieFavorites(Object.values(updatedFavorites));
    }
  };

  // Charger les favoris initiaux au chargement du composant

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('favorites/movie')) || {};
    const serieFavs = JSON.parse(localStorage.getItem('favorites/serie')) || {};
    setMovieFavorites(Object.values(movieFavs));
    setSerieFavorites(Object.values(serieFavs));
  }, []);

  return (
    <div className="">
      <h1>My Favorites</h1>
      <div className="d-flex flex-wrap justify-content-center">

        {movieFavorites.map((movie) => (
          <Card key={movie.id} style={{ width: '17rem', height: "100%" }} className="m-3">
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
              style={{ height: "100%", cursor: "pointer" }}
              className="img-fluid"
            />
            <Button onClick={() => removeFavorite("movie", movie.id)}><img src="/public/ASSET/addfav.svg" alt="Remove from favorites" /></Button>
          </Card>
        ))}
        
        {serieFavorites.map((serie) => (
          <Card key={serie.id} style={{ width: '17rem', height: "100%" }} className="m-3">
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`}
              style={{ height: "100%", cursor: "pointer" }}
              className="img-fluid"
            />
            <Button onClick={() => removeFavorite("serie", serie.id)}><img src="/public/ASSET/removefav.svg" alt="Remove from favorites" /></Button>
          </Card>
        ))}
      </div>
      <div className="d-flex justify-content-center bg-body-tertiary">
                <Footer />
            </div>
    </div>
  );
};

export default FavoritesView;
