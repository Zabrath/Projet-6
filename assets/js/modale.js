let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null

if (!window.localStorage.getItem("token")) {

    const adminBtn = document.querySelector('.admin-btn');
    adminBtn.remove();
    const displayAdmin = document.querySelector('.admin-overlay')
    displayAdmin.remove()

  }

const openmodale = async function (event) {
    event.preventDefault()
    modal = document.querySelector(event.target.getAttribute('href'))
    // modal = await loadModal()
    loadModal()
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusables[0].focus()
    // modal.setAttribute('aria-hidden', false) // target.removeAttribute('aria-hidden')
    // modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (event) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    event.preventDefault()
    modal.style.display = "none"
    // modal.setAttribute('aria-hidden', 'true')
    // modal.removeAttribute('aria-modal')
    // modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', closeModal)
    modal = null
    
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
        galleryModale += `<img src="${element.imageUrl}" alt="${element.title}">`;
        galleryModale += `<button class="vignette__btn">X</button>`;
        galleryModale += `</div>`;
    });

    document.querySelector(".modal-wrapper_img").innerHTML = galleryModale;
    
    const button = document.querySelectorAll('button');
    
    button.forEach(function(boutonDOM) {
        boutonDOM.addEventListener('click', function(event){
            // Je récupère l'ID du projet acollé au bouton
            let projetID = boutonDOM.parentNode.dataset.projet;

            // Requête API pour delete le projet ayant le projetID
            // si l'API te renvoi "ok" alors effectue la suite du code 
            // sinon log d'erreur.


            const projetASupprimer = document.querySelectorAll(`[data-projet="${projetID}"]`);
            
            projetASupprimer.forEach(function(elementASupprimer){
                elementASupprimer.remove();
            })
        })
    })
    
    // console.log(galleryModale);
    
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openmodale)
    
})

window.addEventListener('keydown', function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
        closeModal(event)
    }
    
    if (event.key === 'Tab' && modal !== null) {
        focusInModal(event)
    }
})

