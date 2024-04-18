

const api_key = import.meta.env.VITE_API_KEY;

// Fonction pour récupérer les films populaires depuis l'API

export const fetchPopularMovies = async (page) => {
    let data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=fr-Fr&page=${page}`);
    console.log("ici fetchpopularMovies");
    let response = await data.json();
    return (response.results);
};

// Fonction pour rechercher des films en fonction d'un titre

export const searchMovies = async (title) => {
    let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${title}&language=fr-Fr&page=1`);
    let response = await data.json();
    return response.results;
};

// Fonction pour récupérer les films par rapport à un ID depuis l'API

export const fetchMovieDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=fr-Fr`);
    const data = await response.json();
    return data;
};

// Fonction pour récupérer les series populaires depuis l'API

export const fetchSeries = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}&language=fr-Fr&page=${page}`);
    const data = await response.json();
    return data.results;
};

// Fonction pour rechercher des séries en fonction d'un titre

export const searchSeries = async (title) => {
    let data = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${title}&language=fr-Fr&page=1`);
    let response = await data.json();
    return response.results;
};

// Fonction pour récupérer les series par rapport à un ID depuis l'API

export const fetchSerieDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=fr-Fr`);
    const data = await response.json();
    return data;
};




