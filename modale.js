let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null



const openmodale = async function (event) {
    event.preventDefault()
    // modal = document.querySelector(event.target.getAttribute('href'))
    modal = await loadModal()
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

const loadModal = async function (url) {
    const target = document.querySelector('a.js-modal').getAttribute('href');
    const reponse = await fetch("http://localhost:5678/api/works");  
    const tableau = await reponse.json();
    const html = tableau.map(product => product.imageUrl);
    // const element = document.createRange().createContextualFragment(html).querySelector(target);
    // if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`;
    // return element

    console.log(target ,html);

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

