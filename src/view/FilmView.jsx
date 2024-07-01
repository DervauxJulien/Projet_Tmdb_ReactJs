


import CardMovie from "../components/CardMovie";
import Footer from "../components/Footer";
import PaginationComponent from "../components/PaginationComponent";

// Définition du composant FilmView qui reçoit plusieurs props pour gérer les films, la pagination et les favoris
const FilmView = ({ movies, handleSearch, page, setPage }) => {
    return (
        // Container principal utilisant la classe Bootstrap pour un conteneur fluide qui s'étend sur toute la largeur
        <div className="container-fluid">
            <header className="d-flex justify-content-center pt-3">
                <h1>Films</h1>
            </header>
            <div className="d-flex justify-content-center m-3">
                <PaginationComponent
                    movies={movies}
                    page={page}
                    setPage={setPage}
                />
            </div>
            {/* Section principale pour afficher les cartes de films, avec une hauteur minimale de 100vh et flexbox */}
            <section className="min-vh-100 d-flex">
                <div className="col-sm-12 d-flex flex-wrap justify-content-center">
                    {/* Boucle à travers les films et rend une carte pour chaque film */}
                    {movies.map((movie) => (
                        <CardMovie
                            key={movie.id} // Clé unique pour chaque carte de film
                            movie={movie}
                            handleSearch={handleSearch}
                        />
                    ))}
                </div>
            </section>
            <footer className="row d-flex justify-content-center bg-dark">
                <Footer />
            </footer>
        </div>
    );
}
export default FilmView;
