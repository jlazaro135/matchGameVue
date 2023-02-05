<script setup>
import { storeToRefs } from 'pinia';
import { useGridStore } from '../stores/grid';

const useGrid = useGridStore()
const {isStartView, isFirstRound} = storeToRefs(useGrid)

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;


// Toggle modal
const toggleModal = event => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.getAttribute('data-target'));
  (typeof(modal) != 'undefined' && modal != null)
    && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

// Is modal open
const isModalOpen = modal => {
  return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modal.removeAttribute('open');
  }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector('article');
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
}

function startGame(){
    isStartView.value = false
    isFirstRound.value = true
}

</script>

<template>
    <h2>Match the country!</h2>
    <p>Pon a prueba tu memoria y encuentra las parejas en el menor tiempo posible</p>
    <button @click="startGame()">Empezar juego</button>
    <button class="contrast" data-target="modal-example" @click="toggleModal($event)">Instrucciones</button>
    <dialog id="modal-example">
        <article>
            <a href="#close"
            aria-label="Close"
            class="close"
            data-target="modal-example"
            @click="toggleModal($event)">
            </a>
            <h3>Instrucciones del juego</h3>
            <p>
                El juego cuenta con cinco niveles en los que habrá que emparejar diferentes países: 
            </p>
            <ul>
                <li>Primer nivel: 8 países</li>
                <li>Segundo nivel: 12 países</li>
                <li>Tercer nivel: 16 países</li>
                <li>Cuarto nivel: 20 países</li>
                <li>Quinto nivel: 24 países</li>
            </ul>
            <p>
                Deberás completarlo en el menor tiempo posible con el menor número de intentos posibles. Un intento 
                se computará cada vez que descubras dos países.
            </p>
            <footer>
            <a href="#confirm"
                role="button"
                data-target="modal-example"
                @click="toggleModal($event)">
                ¡Entendido!
            </a>
            </footer>
        </article>
    </dialog>
</template>

<style scoped>
ul{
    width: fit-content;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}
</style>