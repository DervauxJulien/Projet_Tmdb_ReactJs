import { CarouselCardSerie, CarouselMovie } from "../components/CarouselMovie";
import { CarouselCardMovie } from "../components/CarouselMovie";
import Footer from "../components/Footer";

const HomeView = ({ movies, popularSeries }) => {

    return (

        <div className="container-fluid">
            <div className="min-vh-100">
                <div className="d-flex justify-content-center pb-2 ">
                    <CarouselMovie movies={movies} />
                </div>
                <div className="d-flex flex-wrap justify-content-center pb-2 container-lg">
                    <CarouselCardMovie movies={movies} />
                    <CarouselCardSerie popularSeries={popularSeries} />
                </div>
            </div>
            <div className="row d-flex justify-content-center bg-dark">
                <Footer />
            </div>
        </div>

    )
}

export default HomeView;
