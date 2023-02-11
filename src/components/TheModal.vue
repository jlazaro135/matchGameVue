<script setup>

import { storeToRefs } from 'pinia';
import { toRefs,  } from 'vue';
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
  useCounter.levelCounter = 0
  useTimer.stopInterval = false
  useTimer.totalLevelSeconds= 0
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
    <p>
        xx-tiempo y {{ useCounter.levelCounter }} intentos
    </p>
    <footer>
      <button role="button" @click="goToNext()">Siguiente Nivel</button>
    </footer>
  </article>
</dialog>
</template>

<style scoped>
</style>