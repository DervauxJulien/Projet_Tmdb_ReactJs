import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, Modal, Col } from 'react-bootstrap';
import CardMovie from './CardMovie';
import CardSerie from './CardSerie';
import PaginationComponent from './PaginationComponent';

const NavbarJs = ({ search, setSearch, movies, popularSeries, showModal, setShowModal, page, setPage }) => {
  const [showMovies, setShowMovies] = useState(true);
  const [showSeries, setShowSeries] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    navigate(`/film/detail/${movies.id}`);
    setShowModal(false);
    setSearch('');
    setShowMovies(true);
    setPage(1);
  };

  function darkMode() {
    let getDiv = document.getElementById('body');
    let darkModeOn = getDiv.classList.contains('darkMode');

    if (!darkModeOn) {
      getDiv.classList.add('darkMode');
    } else {
      getDiv.classList.remove('darkMode');
    }
  }

  const handleMovieFilter = () => {
    setShowMovies(true);
    setShowSeries(false);
  };

  const handleSerieFilter = () => {
    setShowMovies(false);
    setShowSeries(true);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
<div className='navbar-container d-flex justify-content-center bg-dark'>
  <Navbar expand="lg" className='navbar-expand-lg'>
    <Navbar.Brand>
      <Link className='text-white text-decoration-none' to={'/'}>
        HOME
      </Link>
    </Navbar.Brand >
    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-white me-5' onClick={() => setExpanded(!expanded)} />
    <Navbar.Collapse id="responsive-navbar-nav" className={expanded ? 'show' : ''}>
      <Nav className='mr-auto text-white'>
        <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/'}>
          Home
        </Link>
        <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/film'}>
          Film
        </Link>
        <Link onClick={() => setPage(1)} className='nav-link text-white' to={'/serie'}>
          Serie
        </Link>
        <Link className='nav-link text-white' to={'/favoris'}>
          Favorite
        </Link>
        <Link onClick={() => setShowModal(true)} className='nav-link text-white cursor-pointer'>
          Rechercher
        </Link>
      </Nav>
    </Navbar.Collapse>
    <Form className=''>
        <Form.Check type="switch" onClick={darkMode} />
      </Form>
  </Navbar>

      <Modal
        dialogClassName="modal-dialog-scrollable modal-fullscreen"
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSearch('');
          setShowMovies(true);
          setPage(1);
        }}
      >
        <Modal.Header closeButton>
          <Col sm="5" className='pe-3'>
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleInputChange}
            />
          </Col>
          <Button onClick={handleMovieFilter} className="me-2">
            Films
          </Button>
          <Button onClick={handleSerieFilter} className="me-2">
            Séries
          </Button>
        </Modal.Header>

        <Modal.Body className='d-flex flex-wrap justify-content-center'>
          <div className='d-flex justify-content-center'>
            <PaginationComponent page={page} setPage={setPage} />
          </div>

          <div className='d-flex justify-content-center flex-wrap'>
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
      </Modal>
    </div>
  );
}

export default NavbarJs;
