

import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect de React
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importation des composants de routing de React Router
 // Importation du composant de mes différentes pages
import HomeView from './view/HomeView';
import SerieView from './view/SerieView'; 
import DetailSerieView from "./view/DetailSerieView";
import FilmView from "./view/FilmView";
import DetailMovieView from "./view/DetailMovieView"; 
import FavoritesView from "./view/FavoritesView";
// Importation du composant de ma barre de navigation
import NavbarJs from "./components/NavbarJs"; 
// Importation des fonctions d'API pour récupérer les données de films et séries
import { fetchPopularMovies, searchMovies, fetchSeries, searchSeries } from "./components/ApiFilm"; 

function App() {
  // Déclaration des états pour gérer les films, les séries populaires, la recherche, l'affichage du modal et la page actuelle
  const [movies, setMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  // Utilisation de useEffect pour effectuer une action après le rendu du composant
  // La fonction fetchData est une fonction asynchrone pour fetcher les données de films et séries
  useEffect(() => {
    const fetchData = async () => {
      if (!search) {
        // Si il n'y a pas de recherche, je fetch les données populaires de films et séries
        setMovies(await fetchPopularMovies(page));
        setPopularSeries(await fetchSeries(page));
      } else {
        // Si il y a une recherche, fetch les données correspondantes à la recherche
        setMovies(await searchMovies(search));
        setPopularSeries(await searchSeries(search));
      }
    }
    // Appel de la fonction asynchrone pour fetcher les données
    fetchData();
  }, [search, page]); // Dépendances : se déclenche quand 'search' ou 'page' change

  // Fonctions pour la pagination
  const nextPage = () => setPage(page + 1);
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    // Utilisation de BrowserRouter pour définir les routes de l'application
    // Utilisation du composant NavbarJs en passant des props pour gérer les états à travers l'application
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

      {/* Définition de mes routes et des composants associés */}
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
