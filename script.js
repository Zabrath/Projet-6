/* récupération des class */

let gallerie = document.querySelector(".gallery");

/* fonction async qui utilise l'API Fetch pour récupérer les données des utilisateurs à partir de l'API spécifiée */

// Déclaration de la fonction asynchrone
async function fetchDataWorks() {
	const API_URL = "http://localhost:5678/api/works";
  
	// Effectue une requête GET sur l'API
	const response = await fetch(API_URL);
  
	// Récupère les données renvoyées par l'API
	const data = await response.json();
  
	// Retourne les données renvoyées par l'API
	return data;
  }


/* fonction de création de la balise 			<figure>
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure> */

function createFigure(src, alt, textContent) {

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = textContent;

  
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallerie.appendChild(figure);

}


/*  */

async function affichageWorks(){
	// Appel de la fonction asynchrone
	const data = await fetchDataWorks();
	// Permet d'isoler chaque élément du tableau
	data.forEach((element) =>{ 
	// Extraction des éléments 
	let imgUrl = element.imageUrl
	let legende = element.title
	let title = element.title

	createFigure(imgUrl,legende,title)
});

}

affichageWorks();



/* FILTRES */




