import CardSerie from "../components/CardSerie";
import Footer from "../components/Footer";
import PaginationComponent from "../components/PaginationComponent";

// Définition du composant SerieView qui reçoit plusieurs props pour gérer les séries, la pagination et la recherche
const SerieView = ({ popularSeries, handleSearch, page, setPage }) => {
  return (
    // Container principal utilisant la classe Bootstrap pour un conteneur fluide qui s'étend sur toute la largeur
    <div className="container-fluid">
      <header className="d-flex justify-content-center pt-3">
        <h1>Séries</h1>
      </header>
      <div className="d-flex justify-content-center m-3">
        <PaginationComponent
          serie={popularSeries}
          page={page}
          setPage={setPage}
        />
      </div>

      {/* Section principale pour afficher les cartes de séries, avec une hauteur minimale de 100vh et flexbox */}
      <section className="min-vh-100 d-flex">
        <div className="col-sm-12 d-flex flex-wrap justify-content-center">
          {/* Boucle à travers les séries et rend une carte pour chaque série */}
          {popularSeries.map((series) => (
            <CardSerie
              key={series.id}         // Clé unique pour chaque carte de série
              serie={series}          
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
};

export default SerieView;


