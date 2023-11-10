
// Récupération des éléments du formulaire
const formulaireLogin = document.querySelector(".JS-formulaire-login");
const email = document.querySelector("#mail");
const password = document.querySelector("#pass");

// ======================================================================================  //
//                         GESTION LOGIN                                                  //
// ===================================================================================== //

formulaireLogin.addEventListener("submit", async function (event){
  
  event.preventDefault();
  
  const login = {
    email: document.querySelector("input[name='email']").value,
    password: document.querySelector("input[name='password']").value
  };
    
  const chargeUtile = JSON.stringify(login);
    
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
  
  const errorElement = document.querySelector(".JS-error");
  errorElement.innerHTML = `Erreur dans l’identifiant ou le mot de passe`;
}
});

// ======================================================================================  //
//                         GESTION LOGOUT                                                 //
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





