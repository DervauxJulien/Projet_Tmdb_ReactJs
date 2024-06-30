

// Utilisation de ma clé API que j'ai stockée dans une variable d'environnement pour la sécuriser car je travaille
// sur mon dépôt GitHub. J'ai donc inclus mon fichier .env dans mon .gitignore afin de ne pas le pousser dans le dépôt distant.
const api_key = import.meta.env.VITE_API_KEY;

// J'utilise baseUrl comme raccourci pour stocker le début de l'URL qui ne change pas pour l'API
const baseUrl = "https://api.themoviedb.org/3";

// Fonction pour récupérer les films populaires depuis l'API
export const fetchPopularMovies = async (page) => {
    // Appel de l'API pour récupérer les films populaires
    let data = await fetch(`${baseUrl}/movie/popular?api_key=${api_key}&language=fr-FR&page=${page}`);
    console.log("ici fetchpopularMovies");
    // Conversion de la réponse en JSON
    let response = await data.json();
    // Retourne les résultats des films populaires
    return response.results;
};

// Fonction pour rechercher des films en fonction d'un titre
export const searchMovies = async (title) => {
    // Appel de l'API pour rechercher des films par titre
    let data = await fetch(`${baseUrl}/search/movie?api_key=${api_key}&query=${title}&language=fr-FR&page=1`);
    // Conversion de la réponse en JSON
    let response = await data.json();
    // Retourne les résultats de la recherche de films
    return response.results;
};

// Fonction pour récupérer les détails d'un film par rapport à un ID depuis l'API
export const fetchMovieDetails = async (id) => {
    // Appel de l'API pour récupérer les détails d'un film par ID
    const response = await fetch(`${baseUrl}/movie/${id}?api_key=${api_key}&language=fr-FR`);
    // Conversion de la réponse en JSON
    const data = await response.json();
    // Retourne les détails du film
    return data;
};

// Fonction pour récupérer les séries populaires depuis l'API
export const fetchSeries = async (page) => {
    // Appel de l'API pour récupérer les séries populaires
    const response = await fetch(`${baseUrl}/trending/tv/day?api_key=${api_key}&language=fr-FR&page=${page}`);
    // Conversion de la réponse en JSON
    const data = await response.json();
    // Retourne les résultats des séries populaires
    return data.results;
};

// Fonction pour rechercher des séries en fonction d'un titre
export const searchSeries = async (title) => {
    // Appel de l'API pour rechercher des séries par titre
    let data = await fetch(`${baseUrl}/search/tv?api_key=${api_key}&query=${title}&language=fr-FR&page=1`);
    // Conversion de la réponse en JSON
    let response = await data.json();
    // Retourne les résultats de la recherche de séries
    return response.results;
};

// Fonction pour récupérer les détails d'une série par rapport à un ID depuis l'API
export const fetchSerieDetails = async (id) => {
    // Appel de l'API pour récupérer les détails d'une série par ID
    const response = await fetch(`${baseUrl}/tv/${id}?api_key=${api_key}&language=fr-FR`);
    // Conversion de la réponse en JSON
    const data = await response.json();
    // Retourne les détails de la série
    return data;
};
