<script setup>

import { useGridStore } from '../stores/grid.js';
import { useOpenModalStore } from '../stores/openModal.js';
import  { useCounterStore } from '../stores/counter';
import  { useTimerStore } from '../stores/timer';
import  { usePointsStore } from '../stores/points';
import { storeToRefs } from 'pinia';
import { toRefs } from 'vue';

const useGrid = useGridStore()
const useOpenModal = useOpenModalStore()
const useTimer = useTimerStore()
const useCounter = useCounterStore()
const usePoints = usePointsStore()

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
  useTimer.totalLevelSecondsArr.push(useTimer.totalLevelSeconds)
  useTimer.totalLevelSeconds = 0
  useCounter.levelCounterArr.push(useCounter.levelCounter)
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
    <p class="para">
        Has conseguido completar el nivel en: 
    </p>
    <p class="results">
      <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
      </svg>
      {{useTimer.levelMinutes}}:{{useTimer.levelSeconds}}
      </div>
    </p>
    <p class="para">
        {{ useCounter.levelCounter === 0 ? '¡Sin fallos!' : 'Número de fallos:' }}
    </p>
    <p class="results">
      <div v-if="useCounter.levelCounter === 0" class="wrapper success">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
      Pleno de aciertos
      </div>
      <div v-else class="wrapper danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
          <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      {{ useCounter.levelCounter }} fallos
      </div>
    </p>
    <p class="para">
        Puntos conseguidos:
    </p>
    <p class="results">
      <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      {{ usePoints.finalPoints() }} puntos
      </div>
    </p>
    <footer>
      <button role="button" @click="goToNext()">Siguiente Nivel</button>
    </footer>
  </article>
</dialog>
</template>

<style scoped>
h3{
  text-align: center;
}

.results{
  display: flex;
  flex-direction: column;
  font-weight: 700;
  margin: 0 auto 1rem auto;
  width: fit-content;
  justify-content: center;
  gap: 0.5rem;
}

.wrapper{
  font-weight: 900;
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

.para{
  margin: 0;
  text-align: center;
}

.success{
  color: rgb(0, 175, 0)
}

.danger{
  color: red;
}

</style>