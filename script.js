/* récupération des class */

const gallerie = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres")

// ======================================================================================  //
//                              Gallerie                                                  //
// ===================================================================================== //


// Déclaration de la fonction asynchrone (await donc obligation Async)
async function fetchDataWorks() {
	const API_URL = "http://localhost:5678/api/works";
	
	// Effectue une requête GET sur l'API
	const response = await fetch(API_URL);
	
	// Récupère les données renvoyées par l'API
	const data = await response.json();
	
	// Retourne les données renvoyées par l'API
	return data;
}



/* Fonction pour extraire et appliquer les informations de la BDD au front-end. */
async function affichageWorks(){
	// Appel de la fonction asynchrone
	const data = await fetchDataWorks();
	// Permet d'isoler chaque élément du tableau
	let htmlProjets = ``;
	data.forEach((element) => {  
		htmlProjets += `<figure>`;
		htmlProjets += `<img src="${element.imageUrl}" alt="${element.title}">`;
		htmlProjets += `<figcaption>${element.title}</figcaption>`;
		htmlProjets += `</figure>`;
	});
	
	// Ajout du balisage HTML au DOM
	document.querySelector(".gallery").innerHTML = htmlProjets;
	
}

// Appel de la fonction affichageWorks() après que les éléments du DOM ont été chargés
affichageWorks();



// ======================================================================================  //
//                                 FILTRES                                                //
// ===================================================================================== //



async function fetchDataCategories() {
	const API_URL = "http://localhost:5678/api/categories";
	
	// Effectue une requête GET sur l'API
	const response = await fetch(API_URL);
	
	// Récupère les données renvoyées par l'API
	const data = await response.json();
	
	// Retourne les données renvoyées par l'API
	return data;
}

fetchDataCategories();



async function createFiltres() {
	// Appel de la fonction asynchrone
	const data = await fetchDataCategories();
	// Création d'une variable affichages qui contiendra le balisage HTML à afficher
	let affichages = ``;
	// Ajout d'un bouton radio par défaut pour afficher toutes les œuvres d'art
	affichages += `<input type="radio" name="radio" class="filtre-radio" id="0" checked>`;
	affichages += `<label for="0">Tous</label>`;
	
	// Ajout des filtres dynamiques
	data.forEach((element) => {
		affichages += `<input type="radio" name="radio" class="filtre-radio" id="${element.id}">`;
		affichages += `<label for="${element.id}">${element.name}</label>`;
	});
	
	// Ajout du balisage HTML au DOM
	document.querySelector(".filtres").innerHTML = affichages;
}

// ======================================================================================  //
//                         GESTION FILTRES                                                //
// ===================================================================================== //

// Fonction asynchrone qui affiche les œuvres d'art d'une catégorie donnée
async function affichageWorksFilters(id) {
	// Appel de la fonction asynchrone
	const data = await fetchDataWorks();
	// Création d'une variable affichages qui contiendra le balisage HTML à afficher
	let htmlFiltres = ``;
	// Filtrage des données en fonction de l'ID de la catégorie sélectionnée
	data.filter((dataFiltre) => dataFiltre.categoryId == id)
	// Parcours des données filtrées et ajout des œuvres d'art au balisage HTML
	.forEach((categorieFiltre) => {
		htmlFiltres += `<figure>`;
		htmlFiltres += `<img src="${categorieFiltre.imageUrl}" alt="${categorieFiltre.title}">`;
		htmlFiltres += `<figcaption>${categorieFiltre.title}</figcaption>`;
		htmlFiltres += `</figure>`;
	});
	
	// Ajout du balisage HTML au DOM
	document.querySelector(".gallery").innerHTML = htmlFiltres;
}

async function utilisationFiltre() {
	// Appel de la fonction asynchrone
	await createFiltres();
	
	
	// Sélection de tous les éléments input du DOM qui ont une classe "filtres"
	let selectionDesFiltres = document.querySelectorAll(".filtres input");
	// Parcours de la variable selectionDesFiltres et ajout d'un événement click à chaque élément input
	selectionDesFiltres.forEach((btn) => {
		// Ajout d'un événement click à l'élément input
		btn.addEventListener("click", async function () {
			// Récupération de l'ID de la catégorie sélectionnée
			let id = btn.id;
			// Appel de la fonction appropriée pour afficher les œuvres d'art
			if (id == 0) {
				// Appel de la fonction affichageWorks() pour afficher toutes les œuvres d'art
				affichageWorks();
			} else {
				// Appel de la fonction affichageWorksFilters() pour afficher les œuvres d'art qui appartiennent à la catégorie sélectionnée
				affichageWorksFilters(id);
			}
		});
	});
}

utilisationFiltre();





// ======================================================================================  //
//                         LOGIN                                                          //
// ===================================================================================== //



