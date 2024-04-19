import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";

const FavoritesView = () => {
  const [movieFavorites, setMovieFavorites] = useState([]);
  const [serieFavorites, setSerieFavorites] = useState([]);

  const removeFavorite = (type, id) => {
    const favorites = JSON.parse(localStorage.getItem(`favorites/${type}`)) || {};
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[id];
    localStorage.setItem(`favorites/${type}`, JSON.stringify(updatedFavorites));

    if (type === "movie") {
      setMovieFavorites(Object.values(updatedFavorites));
    } else {
      setSerieFavorites(Object.values(updatedFavorites));
    }
  };

  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem('favorites/movie')) || {};
    const serieFavs = JSON.parse(localStorage.getItem('favorites/serie')) || {};
    setMovieFavorites(Object.values(movieFavs));
    setSerieFavorites(Object.values(serieFavs));
  }, []);

  return (
    <>
      <div className="container-fluid vh-100">
        <h1 className="d-flex justify-content-center p-2">My Favorites</h1>
        <div className="d-flex flex-wrap justify-content-center min-vh-100">
          {movieFavorites.map((movie) => (
            <div key={movie.id} className='row col-12 col-sm-6 col-md-4 col-lg-6 d-flex justify-content-center bg-dark align-items-center rounded-3 m-2'>
              <div className="col-12 col-sm-10 col-md-4 col-lg-4 col-xl-4 justify-content-center p-5">
                <div className="h-100">
                  <Card.Img variant="top" className='img-fluid' src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} />
                </div>
              </div>
              <div style={{ width: '30rem' }} className="border-3 m-3">
                <Card.Body className='d-flex flex-column justify-content-center'>
                  <Card.Title className='text-white'><h1>{movie.title}</h1></Card.Title>
                  <Card.Title className='text-white'>{movie.overview}</Card.Title>
                  <div className='d-flex justify-content-evenly align-items-center mt-5 text-white'>
                    <Button variant='danger' onClick={() => removeFavorite("movie", movie.id)}>Remove from Favorites</Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          ))}
          {serieFavorites.map((serie) => (
            <div key={serie.id} className='row col-12 col-sm-6 col-md-4 col-lg-6 d-flex justify-content-center bg-dark align-items-center rounded-3 m-2'>
              <div className="col-12 col-sm-10 col-md-4 col-lg-4 col-xl-4 justify-content-center p-5">
                <div className="h-100">
                  <Card.Img variant="top" className='img-fluid' src={`https://image.tmdb.org/t/p/w1280/${serie.poster_path}`} />
                </div>
              </div>
              <div style={{ width: '30rem' }} className="border-3 m-3">
                <Card.Body className='d-flex flex-column justify-content-center'>
                  <Card.Title className='text-white'><h1>{serie.name}</h1></Card.Title>
                  <Card.Title className='text-white'>{serie.overview}</Card.Title>
                  <div className='d-flex justify-content-evenly align-items-center mt-5 text-white'>
                    <Button variant='danger' onClick={() => removeFavorite("serie", serie.id)}>Remove from Favorites</Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center bg-body-tertiary">
          <Footer />
        </div>
      </div>

    </>
  );
};

export default FavoritesView;
