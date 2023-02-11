<script setup>
import { ref } from 'vue';
import  { useCounterStore } from '../stores/counter';
import  { useTimerStore } from '../stores/timer';
const useCounter = useCounterStore()
const useTimer = useTimerStore()

const props = defineProps({
    level: {
        type: Number
    }
})

const renderLevel = ref(props.level)
</script>


<template>
    <div class="box-game">
        <span class="level">Nivel {{renderLevel}}</span>
        <span class="level-counter">
            Intentos:
            <span class="counter">{{useCounter.levelCounter}}</span>
        </span>
        <span class="timmer">
           Tiempo: <span class="minutes">{{useTimer.levelMinutes}}</span>:<span class="seconds">{{useTimer.levelSeconds}}</span>
        </span>
    </div>
</template>

<style scoped>
.box-game{
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    top: 2%;
    right: 1%;
    width: 100%;
    max-width: 225px;
    background-color: #007fff;
    color: #fff;
    border-radius: 5px;
    padding: 0.5rem;
}

.level{
    width: 100%;
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #fff;
}

.level-counter, .timmer{
    font-weight: bold;
}

</style>