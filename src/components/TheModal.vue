<script setup>

import { storeToRefs } from 'pinia';
import { toRefs, ref } from 'vue';
import { useGridStore } from '../stores/grid.js';
import { useOpenModalStore } from '../stores/openModal.js';
import  { useCounterStore } from '../stores/counter';
import  { useTimerStore } from '../stores/timer';
const useGrid = useGridStore()
const useOpenModal = useOpenModalStore()
const useTimer = useTimerStore()
const useCounter = useCounterStore()

const {isOpen} = storeToRefs(useOpenModal)

const props = defineProps({
    level: {
        type: Number,
        default: 1
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    nextLevel: {
        type: Number,
    },
    grid: {
      type: String,
    }
})

const {grid} = toRefs(props)

function goToNext(){
  useOpenModal.isOpen = false
  useTimer.stopInterval = false
  useTimer.totalTimer += useTimer.totalLevelSeconds
  useTimer.totalLevelSeconds = 0
  useCounter.levelCounter = 0
  useTimer.levelSeconds= '00'
  useTimer.levelMinutes= '00'
  switch(grid.value){
    case 'first':
      useGrid.isFirstRound = false
      useGrid.isSecondRound = true
      break
    case 'second':
      useGrid.isSecondRound = false
      useGrid.isThirdRound = true
      break
    case 'third':
      useGrid.isThirdRound = false
      useGrid.isFourthRound = true
      break
    case 'fourth':
      useGrid.isFourthRound = false
      useGrid.isFifthRound = true
      break
    case 'fifth':
      useGrid.isFifthRound = false
      useGrid.isTheEnd = true
      break
    }
}


</script>

<template>
<dialog :open="isOpen">
  <article>
    <h3>Nivel {{ level }} superado</h3>
    <p>
        Has conseguido completar el nivel en: 
    </p>
    <p class="results">
      <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
      </svg>
      {{useTimer.levelMinutes}}:{{useTimer.levelSeconds}}
      </div>
      <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bullseye" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      {{ useCounter.levelCounter }} intentos
      </div>
    </p>
    <footer>
      <button role="button" @click="goToNext()">Siguiente Nivel</button>
    </footer>
  </article>
</dialog>
</template>

<style scoped>
.results{
  display: flex;
  flex-direction: column;
  font-weight: 700;
  margin: auto;
  width: fit-content;
  justify-content: center;
  gap: 0.5rem;
}

.wrapper{
  font-weight: 900;
}

</style>