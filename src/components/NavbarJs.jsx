

import React, { useState } from 'react'; // Import de React et useState depuis React
import { Link } from 'react-router-dom'; // Import du composant Link de react-router-dom pour la navigation
import { Navbar, Nav, Form, Button, Modal, Col } from 'react-bootstrap'; // Import des composants nécessaires depuis react-bootstrap
// Import des mes composants réutilisable
import CardMovie from './CardMovie';
import CardSerie from './CardSerie';
import PaginationComponent from './PaginationComponent';
import Footer from './Footer';
import imgUrl from '../assets/empire-movie.png'

// Je récupère mes props passé depuis ma page App.jsx
const NavbarJs = ({ search, setSearch, movies, popularSeries, showModal, setShowModal, page, setPage }) => {
  // États locaux pour gérer l'affichage des films et séries
  const [showMovies, setShowMovies] = useState(true);
  const [showSeries, setShowSeries] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // Fonction pour gérer le clic sur le détail d'un film
  const handleClick = () => {
    // Naviguer vers la page de détail du film en transportant son ID afin d'alimenter mon call API
    navigate(`/film/detail/${movies.id}`);
    // Fermer le modal après la navigation 
    setShowModal(false);
    // Une fois la navigation réussie, je réinitialise la recherche et j'affiche les films par défaut
    setSearch('');
    setShowMovies(true);
    setPage(1);
  };
  // Fonctions pour filtrer par type (films ou séries)
  const handleMovieFilter = () => {
    setShowMovies(true);
    setShowSeries(false);
  };
  const handleSerieFilter = () => {
    setShowMovies(false);
    setShowSeries(true);
  };
  // Fonction pour gérer le changement dans le champ de recherche
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className='navbar-container d-flex justify-content-center bg-dark'>
      {/* Navbar de React-Bootstrap */}
      <Navbar expand="lg" className='navbar-expand-lg'>
        <Navbar.Brand>
          {/* Lien vers la page d'accueil */}
          <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/'}>
            <img className='logo' src={imgUrl} alt="Logo du site 'Empire Movie'" />
          </Link>
        </Navbar.Brand>
        {/* Bouton de toggler pour le menu responsive */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-white me-5' onClick={() => setExpanded(!expanded)} />
        {/* Menu déroulant des liens */}
        <Navbar.Collapse id="responsive-navbar-nav" className={expanded ? 'show' : ''}>
          <Nav className='mr-auto text-white'>
            {/* Liens vers les différentes pages */}
            <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/film'}>
              Film
            </Link>
            <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/serie'}>
              Serie
            </Link>
            <Link className='nav-link text-white' to={'/favoris'}>
              Favoris
            </Link>
            {/* Bouton pour ouvrir le modal de recherche */}
            <Link onClick={() => setShowModal(true)} className='nav-link text-white cursor-pointer'>
              Rechercher
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal de recherche */}
      <Modal
        dialogClassName="modal-dialog-scrollable modal-fullscreen"
        show={showModal}
        onHide={() => {
          // Fermer le modal et réinitialiser la recherche et la pagination
          setShowModal(false);
          setSearch('');
          setShowMovies(true);
          setPage(1);
        }}
      >
        {/* En-tête du Modal */}
        <Modal.Header closeButton className=' bg-dark border-0'>
          <div className='d-flex justify-content-center container'>
            <Col sm={4} className='pe-3 '>
              {/* Champ de recherche dans le Modal */}
              <Form.Control
                type="text"
                placeholder="Rechercher"
                value={search}
                onChange={handleInputChange}
              />
            </Col>
            {/* Boutons pour filtrer par type (films ou séries) */}
            <Button onClick={handleMovieFilter} className="me-2 bg-dark text-white border">
              Films
            </Button>
            <Button onClick={handleSerieFilter} className="me-2 bg-dark text-white border">
              Séries
            </Button>
          </div>
        </Modal.Header>

        {/* Corps du Modal */}
        <Modal.Body className='d-flex flex-wrap justify-content-center bg-black'>
          <div className='d-flex justify-content-center'>
            {/* Pagination pour naviguer entre les pages de résultats */}
            <PaginationComponent page={page} setPage={setPage} />
          </div>

          <div className='d-flex justify-content-center flex-wrap'>
            {/* Affichage des cartes de films si showMovies est vrai */}
            {showMovies &&
              movies.map((movie) => (
                <CardMovie
                  className="border-5"
                  key={movie.id}
                  movie={movie}
                  setShowModal={setShowModal}
                  setSearch={setSearch}
                  setPage={setPage}
                  onClick={handleClick}
                />
              ))}
            {/* Affichage des cartes de séries si showSeries est vrai */}
            {showSeries &&
              popularSeries.map((serie) => (
                <CardSerie
                  className="border-5"
                  key={serie.id}
                  serie={serie}
                  setShowModal={setShowModal}
                  setSearch={setSearch}
                />
              ))}
          </div>
        </Modal.Body>
        <div className="d-flex justify-content-center bg-dark">
        </div>
      </Modal>
    </div>
  );
}

export default NavbarJs;
