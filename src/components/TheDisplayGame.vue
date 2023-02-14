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
        <span class="level">Ronda {{renderLevel}}</span>
        <span class="level-counter">
            Fallos:
            <span class="counter">{{useCounter.levelCounter }}</span>
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
    justify-content: space-between;
    align-items: center;
    top: 1%;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    background-color: #007fff;
    color: #fff;
    border-radius: 5px;
    padding: 0.3rem;
}

.level{
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
    padding-right: 0.5rem;
    border-right: 1px solid #fff;
}

.level-counter, .timmer{
    font-weight: bold;
}

</style>