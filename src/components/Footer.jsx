
import '/STYLE/style.css'

const Footer = () => {
  return (
      <div className='d-flex justify-content-evenly align-item-center m-3'>
        <a 
        className='pe-5 text-decoration-none text-white' 
        href='#'>Haut de page
        </a>
        <a 
        className='pe-5 text-decoration-none text-white' 
        href="https://github.com/DervauxJulien/Projet_Tmdb_ReactJs/tree/main" 
        // target = 'blank' pour ouvrir le lien de mon projet github dans un nouvel onglet
        target='blank'>Github
        </a>
    </div>    
  );
}

export default Footer;
