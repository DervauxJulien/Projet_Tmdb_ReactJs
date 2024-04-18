
export function StarSerieRating({serie}){

    let starNote = serie.vote_average;
    let starTab = ("" +  starNote).split(".");
    let firstNote = Math.floor(parseInt(starTab[0]) / 2);
    let tab = [];

    // Ajoute les étoiles pleines en fonction de la partie entière de la note

    if (firstNote <= 5) {
    for (let i = 0; i < firstNote; i++) {
        tab.push(<img src="fullstar.svg" alt="" key={i} />);
    }
    }

    // Vérifie s'il y a une demi-étoile en fonction de la partie décimale de la note
    
    if (Math.floor(parseInt(starTab[1])) >= 50) {
        tab.push(<img src="halfstar.svg" alt="" key="demiEtoile" />);
    }

    return (
        <div>
            {tab.length > 0 ? tab : <span>pasDetoile</span>}
        </div>
    );
}


export function StarMovieRating( {movie} ) {
    let tab = [];
    if(!isNaN(movie.vote_average)){
        
        let starNote = movie.vote_average;
        let  test =starNote.toFixed(1);
        console.log(test);
        let starTab = test.split(".");
        let firstNote = Math.floor(parseInt(starTab[0]) / 2);
        
        
        // Ajoute les étoiles pleines en fonction de la partie entière de la note
        if (firstNote <= 5) {
            for (let i = 0; i < firstNote; i++) {
                tab.push(<img src="fullstar.svg" alt="" key={i} />);
            }
        }
        
        // Vérifie s'il y a une demi-étoile en fonction de la partie décimale de la note

        if (Math.floor(parseInt(starTab[1])) >= 5) {
            tab.push(<img src="halfstar.svg" alt="" key="demiEtoile" />);
        }

        
    }

        return (
            <div>
            {tab.length > 0 ? tab : <span>pasDetoile</span>}
        </div>
    );
}


