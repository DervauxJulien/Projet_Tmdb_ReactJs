
import Carousel from 'react-bootstrap/Carousel';
import CardMovie from './CardMovie';
import CardSerie from './CardSerie';
import { Card } from 'react-bootstrap';

export const CarouselMovie = ({ movies }) => {
    return (
        <Carousel 
            fade  // Pour un transition fade lors du changement de film
            indicators={false} // Pour désactiver les indicateurs
            className='container-fluid col-12'>
            {movies.map((movie) => (
                <Carousel.Item key={movie.id} interval={10000} >
                    <Card.Img
                        className="carouselImgEnTete"
                        src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                        alt={movie.title} 
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

// Ici, je fais un mapping sur le tableau movies qui contient les films populaires, en récupérant l'index pour chaque film.
// Ensuite, je vérifie si l'index est divisible par 5.
// Si c'est le cas, je rends le composant Carousel.Item.
// Chaque Carousel.Item contient le composant CardMovie avec un groupe de 5 films, à partir de l'index actuel.

export const CarouselCardMovie = ({ movies }) => {
    return (
        <div className='d-flex flex-column align-items-center mt-4 carouselStyle'>
            <h2>Films tendances</h2>
            <Carousel fade className='justify-content-center row col-12' interval={null} indicators={false}>
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
            <h2>Séries tendances</h2>
            <Carousel fade className='justify-content-center row col-12' interval={null} indicators={false}>
                {popularSeries.map((series, index) => (
                    index % 5 === 0 && (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center carouselStyle">
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

