
// // sophie.bluel@test.tld S0phie 

// Récupération des éléments du formulaire
const formulaireLogin = document.querySelector(".formulaire-login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// Ajout d'un listener de soumission au formulaire
formulaireLogin.addEventListener("submit", function (event){
  // Prévention du rechargement de la page
  event.preventDefault();

  // Vérification que l'élément input existe et qu'il n'est pas null
  if (email === null || password === null) {
    // Affichage d'un message d'erreur
    const errorElement = document.querySelector(".error");
    errorElement.innerHTML = "L'adresse e-mail et le mot de passe sont incorrect.";
    return;
  }


  const login = {
    email: document.querySelector("input[name='email']").value,
    password: document.querySelector("input[name='password']").value
  };

 
  const chargeUtile = JSON.stringify(login);

 
  fetch("http://localhost:5678/api/users/login", {
    method: "GET",
    headers: {"content-type":"application/json"},
    body: chargeUtile
  })
    .then((response) => response.json())
    .then((data) => {
      
      if (data.success) {
        const token = data.token;

        
        localStorage.setItem("token", token);

        
        window.location.href = "./index.html";
      } else {
        
        const errorElement = document.querySelector(".error");
        errorElement.innerHTML = `Erreur de connexion : ${data.error}`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

