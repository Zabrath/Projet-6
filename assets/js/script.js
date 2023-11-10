/* récupération des class */

const gallerie = document.querySelector(".gallery");
const filtres = document.querySelector(".filtres")

// ======================================================================================  //
//                              Gallerie                                                  //
// ===================================================================================== //


// Déclaration de la fonction asynchrone (await donc obligation Async)
async function fetchData(URL) {
	
	const response = await fetch(URL);
	return await response.json();
}

// Fonction pour extraire et appliquer les informations de la BDD au front-end.
async function affichageWorks(){
	
	const data = await fetchData("http://localhost:5678/api/works");
	
	let htmlProjets = ``;
	data.forEach((element) => {  
		htmlProjets += `<figure data-projet="${element.id}">`;
		htmlProjets += `<img src="${element.imageUrl}" alt="${element.title}">`;
		htmlProjets += `<figcaption>${element.title}</figcaption>`;
		htmlProjets += `</figure>`;
	});
	
	// Ajout du balisage HTML au DOM
	document.querySelector(".gallery").innerHTML = htmlProjets;
	
}

// Appel de la fonction affichageWorks() après que les éléments du DOM aient été chargés
affichageWorks();



// ======================================================================================  //
//                                 FILTRES                                                //
// ===================================================================================== //

async function createFiltres() {

	const data = await fetchData("http://localhost:5678/api/categories");

	let affichages = ``;

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
	
	const data = await fetchData("http://localhost:5678/api/works");
	
	let htmlFiltres = ``;
	
	data.filter((dataFiltre) => dataFiltre.categoryId == id)
	
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
	
	await createFiltres();
	
	
	
	let selectionDesFiltres = document.querySelectorAll(".filtres input");
	
	selectionDesFiltres.forEach((btn) => {
		
		btn.addEventListener("click", async function () {
			
			let id = btn.id;
			
			if (id == 0) {
				affichageWorks();
			} else {				
				affichageWorksFilters(id);
			}
		});
	});
}

utilisationFiltre();





// ======================================================================================  //
//                         LOGOUT INDEX                                                    //
// ===================================================================================== //

document.addEventListener("DOMContentLoaded", function() {
	const logout = document.getElementById("logout");
	const token = localStorage.getItem("token");
	
	if (token) {
		logout.textContent = "Logout";
		
		logout.addEventListener("click", function(event) {
			event.preventDefault();
			
			localStorage.removeItem("token");
			
			
			window.location.reload();
		});
	}
});
