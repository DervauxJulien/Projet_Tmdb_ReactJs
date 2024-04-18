import Carousel from 'react-bootstrap/Carousel';
import CardMovie from './CardMovie';
import CardSerie from './CardSerie';

export const CarouselMovie = ({ movies }) => {
    return (
        <Carousel fade className='carouselEnTete'>
            {movies.map((movie) => (
                <Carousel.Item key={movie.id} interval={10000}>
                    <img
                        className="d-block w-100 carouselImgEnTete"
                        src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                        alt={movie.title} 
                    />
                    <Carousel.Caption>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export const CarouselCardMovie = ({ movies }) => {
    return (
        <div className='d-flex flex-column align-items-center mt-4 carouselStyle'>
            <h1>Films tendances</h1>
            <Carousel fade className='justify-content-center' interval={null} indicators={false}>
                {movies.map((films, index) => (
                    index % 5 === 0 && (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center carouselStyle">
                                {movies.slice(index, index + 5).map((film, filmIndex) => (
                                    <CardMovie movie={film} key={filmIndex} />
                                ))}
                            </div>
                        </Carousel.Item>
                    )
                ))}
            </Carousel>
        </div>
    );
};

export const CarouselCardSerie = ({ popularSeries }) => {
    return (
        <div className='d-flex flex-column align-items-center mt-4 carouselStyle'>
            <h1>Séries tendances</h1>
            <Carousel fade className='justify-content-center' interval={null} indicators={false}>
                {popularSeries.map((series, index) => (
                    index % 5 === 0 && (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center">
                                {popularSeries.slice(index, index + 5).map((serie, serieIndex) => (
                                    <CardSerie serie={serie} key={serieIndex} />
                                ))}
                            </div>
                        </Carousel.Item>
                    )
                ))}
            </Carousel>
        </div>
    );
};
