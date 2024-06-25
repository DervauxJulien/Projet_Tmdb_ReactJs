import CardMovie from "../components/CardMovie";
import Footer from "../components/Footer";
import PaginationComponent from "../components/PaginationComponent";

const FilmView = ({ movies, handleSearch, setFavorite, favorite, page, setPage }) => {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center pt-3">
                <h1>Films</h1>
            </div>
            <div className="d-flex justify-content-center m-3">
                <PaginationComponent
                    movies={movies}
                    page={page}
                    setPage={setPage}
                />
            </div>
            <div className="min-vh-100 d-flex">
                <div className="col-sm-12 d-flex flex-wrap justify-content-center">
                    {movies.map((movie) => (
                        <CardMovie
                            key={movie.id}
                            movie={movie}
                            handleSearch={handleSearch}
                            favorite={favorite}
                            setFavortie={setFavorite}
                        />
                    ))}
                </div>
            </div>
            <div className="row d-flex justify-content-center bg-dark">
                <Footer />
            </div>
        </div>
    );
}

export default FilmView;