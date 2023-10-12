/* récupération des class */

let gallerie = document.querySelector(".gallery");

/* fonction async qui utilise l'API Fetch pour récupérer les données des utilisateurs à partir de l'API spécifiée */

async function fetchData() {
	const url = "http://localhost:5678/api/works";
  
	const response = await fetch(url);
  
	const data = await response.json();
  
	return data;
  }

/* fonction de création de la balise 			<figure>
				<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
				<figcaption>Abajour Tahina</figcaption>
			</figure> */

			function createFigure(src, alt) {
				let figure = document.createElement("figure");
			  
				let img = document.createElement("img");
				img.src = src;
				img.alt = alt;
			  
				let figcaption = document.createElement("figcaption");
				figcaption.textContent = alt;

				gallerie.appendChild(figure);
				figure.appendChild(img);
				figure.appendChild(figcaption);
				
			  
				return figure;
			  }

			  



createFigure();

