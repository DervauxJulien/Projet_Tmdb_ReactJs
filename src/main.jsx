


import React from 'react'; // Importation de React, nécessaire pour utiliser JSX
import ReactDOM from 'react-dom'; // Importation de ReactDOM pour le rendu de l'application React 
import App from './App.jsx'; // Importation du composant racine de l'application
import '../STYLE/style.css'; // Importation du fichier CSS pour les styles spécifiques de mon application
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du fichier CSS de Bootstrap utiliser bootstrap dans mon app

// Rendu de l'application dans l'élément avec l'ID 'root' situé dans index.html
ReactDOM.createRoot(document.getElementById('root')).render(
// J'englobe mon composant App par React StrictMode pour faire des vérifications supplémentaires en mode développement
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


