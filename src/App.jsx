
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from './view/HomeView';
import SerieView from './view/SerieView';
import FilmView from "./view/FilmView";
import NavbarJs from "./components/NavbarJs";
import { fetchPopularMovies, searchMovies, fetchSeries, searchSeries } from "./components/ApiFilm";
import DetailSerieView from "./view/DetailSerieView";
import DetailMovieView from "./view/DetailMovieView";
import FavoritesView from "./view/FavoritesView";

function App() {

  // Je déclare les états pour gérer les films, les séries populaires, la recherche, l'affichage du modal et la page actuelle
  const [movies, setMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  // j'utilise useEffect pour effectuer une action après le rendu du composant
  useEffect(() => {
    // Si il n'y a pas de recherche,je fetch les données populaires de films et séries
    if (!search) {
      const fetchData = async () => {
        setMovies(await fetchPopularMovies(page));
        setPopularSeries(await fetchSeries(page));
      }
      fetchData();
    } else {
      // Si il y a une recherche,je fetch les données correspondantes à la recherche
      const fetchData = async () => {
        setMovies(await searchMovies(search));
        setPopularSeries(await searchSeries(search));
      }
      fetchData();
    }
  }, [search, page]); // Dépendances : se déclenche quand search ou page change

  // Fonctions pour la pagination
  const nextPage = () => setPage(page + 1);
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    //J'utilise BrowserRouter pour définir les routes de l'application
    // J'utilise le Composant NavbarJs avec des props pour gérer la recherche, les films, les séries populaires, le modal et la pagination
    <BrowserRouter>
      <NavbarJs
        search={search}
        setSearch={setSearch}
        movies={movies}
        setMovies={setMovies}
        popularSeries={popularSeries}
        setPopularSeries={setPopularSeries}
        showModal={showModal}
        setShowModal={setShowModal}
        page={page}
        setPage={setPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />

      {/* Définition des routes et des composants associés */}
      <Routes>
        <Route path="/" element={<HomeView
          movies={movies}
          popularSeries={popularSeries}
        />} />
        <Route path="/film" element={<FilmView
          movies={movies}
          page={page}
          setPage={setPage}
        />} />
        <Route path="/serie" element={<SerieView
          popularSeries={popularSeries}
          page={page}
          setPage={setPage}
        />} />
        <Route path="/favoris" element={<FavoritesView />} />
        <Route path="/film/detail/:id" element={<DetailMovieView />} />
        <Route path="/serie/detail/:id" element={<DetailSerieView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
