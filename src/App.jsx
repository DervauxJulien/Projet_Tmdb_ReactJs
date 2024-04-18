import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomeView from './view/HomeView';
import SerieView from './view/SerieView';
import FilmView from "./view/FilmView";
import NavbarJs from "./components/NavbarJs";
import { fetchPopularMovies, searchMovies, fetchSeries, searchSeries } from "./components/ApiFilm";
import DetailSerieView from "./view/DetailSerieView";
import DetailMovieView from "./view/DetailMovieView";
import FavoritesView from "./view/FavoritesView";

function App() {
  
  const [movies, setMovies] = useState([]); 
  const [popularSeries, setPopularSeries] = useState([]); 
  const [search, setSearch] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [page , setPage] = useState(1);
  
  useEffect(() => {

    if (!search){
    const fetchData = async () => {
      setMovies(await fetchPopularMovies(page));
      setPopularSeries(await fetchSeries(page));
    }  
    fetchData();
  }else{
    const fetchData = async () => {
        setMovies(await searchMovies(search));
        setPopularSeries(await searchSeries(search));
      } 
    fetchData();
      } 
  }, [search,page]);

  const nextPage = () => page(setPage(page+1));
  
  const previousPage = () => {
    if(page>1){
    page(setPage(page-1))
  }
  }

  return (

    <BrowserRouter>
      <NavbarJs
        search={search}
        setSearch={setSearch}
        movies = {movies}
        setMovies = {setMovies}
        popularSeries={popularSeries}
        setPopularSeries={setPopularSeries}
        showModal = {showModal}
        setShowModal = {setShowModal}
        page={page}
        setPage = {setPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />

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
        <Route path="/favoris" element={<FavoritesView/>}/>
        <Route path="/film/detail/:id" element={<DetailMovieView />} />
        <Route path="/serie/detail/:id" element={<DetailSerieView />} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
