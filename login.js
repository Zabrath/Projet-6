

// // sophie.bluel@test.tld S0phie 

// Récupération des éléments du formulaire
const formulaireLogin = document.querySelector(".formulaire-login");
const email = document.querySelector("#mail");
const password = document.querySelector("#pass");

// Ajout d'un listener de soumission au formulaire
formulaireLogin.addEventListener("submit", async function (event){
  console.log(event);
  console.log(email);
  console.log(password);

  // Prévention du rechargement de la page
  event.preventDefault();
  
  const login = {
    email: document.querySelector("input[name='email']").value,
    password: document.querySelector("input[name='password']").value
  };
  
  
  const chargeUtile = JSON.stringify(login);
  
  console.log(chargeUtile);

  fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {"content-type":"application/json"},
  body: chargeUtile,
  
})

const response = await fetch("http://localhost:5678/api/users/login", {
method: "POST",
headers: {"content-type":"application/json"},
body: chargeUtile,
});

const data = await response.json();

if (data.hasOwnProperty("token")) {
  
  localStorage.setItem("token", data.token);
  
  
  window.location.href = "./index.html";
} else {
  
  const errorElement = document.querySelector(".error");
  errorElement.innerHTML = `Erreur dans l’identifiant ou le mot de passe`;
}
});

