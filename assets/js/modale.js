let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null
let isModalOpen = false;


if (!window.localStorage.getItem("token")) {
    
    const adminBtn = document.querySelector('.admin-btn');
    adminBtn.remove();
    const displayAdmin = document.querySelector('.admin-overlay')
    displayAdmin.remove()    
}

const openModale = async function (event) {
    if (isModalOpen) {
        closeModal();
    }
    event.preventDefault();
    
    modal = document.querySelector(event.target.getAttribute('href'));
    if (modal !== null) {
        loadModal();
        
        focusables = Array.from(modal.querySelectorAll(focusableSelector));
        previouslyFocusedElement = document.querySelector(':focus');
        modal.style.display = null;
        focusables[0].focus();
        // modal.setAttribute('aria-hidden', false) // target.removeAttribute('aria-hidden')
        // modal.setAttribute('aria-modal', 'true')
        modal.addEventListener('click', closeModal);
        modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    }
    isModalOpen = true;
};


const closeModal = function (event) {
    if (modal !== null) {
        if (modal === null) return
        if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
        if (event !== undefined) event.preventDefault();
        modal.style.display = "none"
        // modal.setAttribute('aria-hidden', 'true')
        // modal.removeAttribute('aria-modal')
        modal.removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
        modal.querySelector('.js-modal-stop').removeEventListener('click', closeModal)
        isModalOpen = false;
        modal = null;
    }
    
    
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

const focusInModal = function (event) {
    event.preventDefault()    
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (event.shiftKey === true) {
        index --
    } else {
        index ++
    }
    
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length -1
    }
    focusables[index].focus()
}

const loadModal = async function () {
    const reponse = await fetch("http://localhost:5678/api/works");  
    const tableau = await reponse.json();    
    // Permet d'isoler chaque élément du tableau
    let galleryModale = ``;
    
    await tableau.forEach((element) => {
        galleryModale += `<div data-projet="${element.id}" class="vignette">`;
        galleryModale += `<img class="vignette__img" src="${element.imageUrl}" alt="${element.title}">`;
        galleryModale += `<i class="fa-solid fa-trash-can"></i>`;
        galleryModale += `</div>`;
    });
    
    document.querySelector(".modal-wrapper_img").innerHTML = galleryModale;
    
    const button = document.querySelectorAll('i');
    
    button.forEach(function(boutonDOM) {
        boutonDOM.addEventListener('click', function(event){
            // Je récupère l'ID du projet acollé au bouton
            let projetID = boutonDOM.parentNode.dataset.projet;
            // Requête API pour delete le projet ayant le projetID
            fetch(`http://localhost:5678/api/works/${projetID}`, {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            
            
        });
        
        const projetASupprimer = document.querySelectorAll(`[data-projet="${projetID}"]`);
        
        projetASupprimer.forEach(function(elementASupprimer){
            elementASupprimer.remove();
        })
    })
})}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModale)
    
})

window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
    
    if (event.key === 'Tab' && modal !== null) {
        focusInModal(event)
    }
})

// Ajout photo

const form = document.getElementById('Myform');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // vérification formulaire remplit
    
    const formData = new FormData(this);
    let isFormValid = true;
    
    for (let value of formData.values()) {
        if (!value) {
            isFormValid = false;
            break;
        }
    }
    
    const travaux = document.getElementById('travaux');
    if (!travaux.files.length) {
        isFormValid = false;
    }
    
    if (!isFormValid) {
        alert("Tous les champs, y compris le fichier, doivent être remplis !");
        return;
    }
    
    // Si tous les champs sont remplis, procéder à l'envoi des données
    const fetchCreation = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    body: formData,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const data = await fetchCreation.json();
let htmlProjets = ``;

htmlProjets += `<figure data-projet="${data.id}">`;
htmlProjets += `<img src="${data.imageUrl}" alt="${data.title}">`;
htmlProjets += `<figcaption>${data.title}</figcaption>`;
htmlProjets += `</figure>`;

document.querySelector(".gallery").innerHTML += htmlProjets;

console.log(data);

closeModal();
});



const arrow = document.getElementById('arrow');

arrow.addEventListener('click', function(event) {
    event.preventDefault();
    openModale(event)
});






