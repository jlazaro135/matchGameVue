<script setup>
import { storeToRefs } from 'pinia';
import { useGridStore } from '../stores/grid';

const useGrid = useGridStore()
const {isStartView, isFirstRound, isRankingView} = storeToRefs(useGrid)

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

function seeRanking(){
    isStartView.value = false
    isRankingView.value = true
}

</script>

<template>
    <img src="../../public/logo.png" alt="logo" width="500" height="500">
    <p>Pon a prueba tu memoria y encuentra la pareja de cada bandera en el menor tiempo posible</p>
    <button @click="startGame()">Empezar juego</button>
    <button class="contrast" data-target="modal-example" @click="toggleModal($event)">Instrucciones</button>
    <button @click="seeRanking()">Ver Ranking</button>
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
                El juego cuenta con cinco rondas en las que habr?? que encontrar la pareja de cada bandera. A medida que vayas avanzando
                de ronda la dificultad ir?? aumentando: 
            </p>
            <ul>
                <li>Primera ronda: 4 banderas / 8 cartas</li>
                <li>Segunda ronda: 6 banderas / 12 cartas</li>
                <li>Tercera ronda: 8 banderas / 16 cartas</li>
                <li>Cuarta ronda: 10 banderas / 20 cartas</li>
                <li>Quinta ronda: 12 banderas / 24 cartas</li>
            </ul>
            <p>
                Deber??s completarlo en el menor tiempo posible con el menor n??mero de fallos posibles.
            </p>
            <p>
                El sistema de puntuaci??n es simple: se parte desde una puntuaci??n m??xima y
                seg??n el tiempo que emplees en emparejar todas los banderas junto con los fallos acumulados se ir?? restando (o no!) dicha puntuaci??n.
                La puntuaci??n m??xima que puedes obtener var??a seg??n la ronda:
            </p>
            <ul>
                <li>Primera ronda: 1000 puntos</li>
                <li>Segunda ronda: 2000 puntos</li>
                <li>Tercera ronda: 3000 puntos</li>
                <li>Cuarta ronda: 4000 puntos</li>
                <li>Quinta ronda: 5000 puntos</li>
            </ul>
            <p>
                Por cada fallo se resta 50 puntos. Si el n??mero de fallos supera el n??mero de banderas que hay en la ronda, los fallos pasan a restar 100 puntos.
            </p>
            <p>
                El tiempo que tardas en completar penaliza de la siguiente forma:
            </p>
            <ul>
                <li>Primera ronda: Cada 10 segundos resta 100 puntos</li>
                <li>Segunda ronda: Cada 15 segundos resta 200 puntos</li>
                <li>Tercera ronda: Cada 20 segundos resta 300 puntos</li>
                <li>Cuarta ronda: Cada 25 segundos resta 400 puntoss</li>
                <li>Quinta ronda: Cada 30 segundos resta 500 puntos</li>
            </ul>
            <p>
                Si logras completar la ronda sin fallos obtienes una recompesa. La recompesa ser?? mayor cuanto m??s dif??cil sea la ronda:
            </p>
            <ul>
                <li>Primera ronda: + 100 puntos</li>
                <li>Segunda ronda: + 200 puntos</li>
                <li>Tercera ronda: + 300 puntos</li>
                <li>Cuarta ronda: + 400 puntoss</li>
                <li>Quinta ronda: + 500 puntos</li>
            </ul>
            <p>Ahh...! No olvides registrar tu puntuaci??n al final. ??A jugar!</p>
            <footer>
            <a href="#confirm"
                role="button"
                data-target="modal-example"
                @click="toggleModal($event)">
                ??Entendido!
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

img{
  max-width: 250px;
}
</style>