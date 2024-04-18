import { CarouselCardSerie, CarouselMovie } from "../components/CarouselMovie";
import { CarouselCardMovie } from "../components/CarouselMovie";
import Footer from "../components/Footer";

const HomeView = ({ movies, popularSeries }) => {

    return (

        <div className="contrainer-fluid">
            <div className="d-flex flex-wrap justify-content-center pb-2 ">
                <CarouselMovie movies={movies} />
            </div>
            <div className="d-flex flex-wrap justify-content-center  pb-2">
                <CarouselCardMovie movies={movies} />
                <CarouselCardSerie popularSeries={popularSeries} />
            </div>
            <div className="d-flex justify-content-center bg-black">
                <Footer />
            </div>
        </div>


    )
}

export default HomeView;
