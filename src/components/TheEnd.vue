<script setup>
import { ref } from 'vue';
import { apiClient } from '../js/apiClient';
import { API_RANKING } from '../js/const';
import {pad} from '../js/utils'
import  { useResultStore } from '../stores/result';
import  { useGridStore } from '../stores/grid';
import { storeToRefs } from 'pinia';

const useResult = useResultStore()
const useGrid = useGridStore()
const {resultsArr} = useResult

const {isEndView, isRankingView} = storeToRefs(useGrid)
const userName = ref('')
const showInput = ref(true)

let initialValue = {
    time: 0,
    mistakes: 0,
    points: 0,

}

let totalRounds = resultsArr.reduce((acc, currentValue) => {
    return Object.assign(acc, 
    {
        points: acc.points += currentValue.points,
        time: acc.time += currentValue.time,
        mistakes: acc.mistakes += currentValue.mistakes
    })
}, initialValue)

const {time, points, mistakes} = totalRounds

function setMinutes(secs) {
      return pad(parseInt(secs / 60));
}

function setSeconds(secs) {
      return pad(parseInt(secs % 60));
}



async function sendData(){
    let data = {
        name: userName.value,
        points: totalRounds.points
    }
    try {
        let res = await apiClient.post(API_RANKING.concat('user'), data)
        showInput.value = false
    } catch (error) {
        console.log(error)
    }
}


function goToRanking(){
    isEndView.value = false
    isRankingView.value = true
}

</script>

<template>
    <h2>🏁 🏁¡Final!🏁 🏁 </h2>
    <p>Estos son tus resultados 👇👇</p>
    <table role="grid">
        <thead>
            <tr>
                <th>Ronda</th>
                <th>Tiempo empleado</th>
                <th>Fallos</th>
                <th>Puntuación</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="round in resultsArr">
                <td>{{ round.level }}</td>
                <td>{{ setMinutes(round.time) }}:{{ setSeconds(round.time) }}</td>
                <td>{{ round.mistakes }}</td>
                <td>{{ round.points }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>TOTAL</td>
                <td>{{ setMinutes(time) }}:{{ setSeconds(time) }}</td>
                <td>{{ mistakes }}</td>
                <td>{{ points }}</td>
            </tr>
        </tfoot>
    </table>
    <div v-if="showInput">
        <p class="save-para">¡Guarda tu puntuación!</p>
        <form action="" @submit.prevent="sendData()" class="form">
            <input type="text" placeholder="Nombre o nickname" v-model="userName" minlength="5" maxlength="15">
            <button class="btn" @submit="">Envíar puntuación</button>
        </form>
    </div>
    <div class="success" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
        Puntuación enviada
    </div>
    <div class="ranking">
        <a @click="goToRanking()">Ver Ranking</a> 
    </div>
</template>

<style scoped>

h2{
    margin-bottom: 0.5rem;
}
.form{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: 1px solid lightgray;
    box-shadow: 0 0 20px rgba(211, 211, 211, 0.589);
    background-color: #f6f8f9;
    border-radius: 10px;
}

.btn{
    font-size: 0.8rem;
    max-width: 200px;
}

p{
    font-weight: 700;
}

.success{
    color: rgb(0, 175, 0);
}
.ranking{
    display: flex;
    gap: 0.3rem;
    align-items: center;
    margin: 1rem 0;
}

.save-para{
    margin-bottom: 0.5rem;
}

.success{
    color: rgb(0, 175, 0)
}

tfoot > tr > td {
    font-weight: 700;
}

a{
    font-size: 1.1rem;
    cursor: pointer;
}

</style>