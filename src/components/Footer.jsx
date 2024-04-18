import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import CardMovie from './CardMovie';
import CardSerie from './CardSerie';
import { useState } from 'react';
import '/STYLE/style.css'
import PaginationComponent from './PaginationComponent';


const Footer = ({ nextPage , previousPage, page, setPage}) => {



  const handleClick = () => {
    navigate(`/film/detail/${movie.id}`);
};

 // regarder pour time la recherche 

  const navigate = useNavigate();
  const toSerieView = () => { navigate("/serie") }
  const goBack = () => { navigate(-1) }

  return (
      <div className='d-flex justify-content-evenly align-item-center m-3 '>
        <a className='pe-5 text-decoration-none text-white' href='#'>Haut de page</a>
        <a className='pe-5 text-decoration-none text-white' href="https://github.com/Delhumeur">Github</a>
    </div>    
  );
}

export default Footer;
