import CardSerie from "../components/CardSerie";
import Footer from "../components/Footer";
import PaginationComponent from "../components/PaginationComponent";

const SerieView = ({ handleSearch, popularSeries, page, setPage }) => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center pt-3">
        <h1>Series</h1>
      </div>
      <div className="d-flex justify-content-center m-3">
        <PaginationComponent
          serie={popularSeries}
          page={page}
          setPage={setPage}
        />
      </div>

      <div className="min-vh-100 d-flex">
        <div className="col-sm-12 d-flex flex-wrap justify-content-center">
          {popularSeries &&
            popularSeries.map((series) => (
              <CardSerie
                key={series.id}
                serie={series}
                handleSearch={handleSearch}
              />
            ))}
        </div>
      </div>
      <div className="row d-flex justify-content-center bg-dark">
        <Footer />
      </div>
    </div>
  );
};

export default SerieView;
