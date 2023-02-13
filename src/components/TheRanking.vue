<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiClient } from '../js/apiClient';
import {API_RANKING}  from '../js/const'
import { dateToLocale }  from '../js/utils'

let getData = ref(null)
let dataLoaded = ref(false)
let initItem = ref(0)
let endItem = ref(10)
let entries = ref(10)

getData.value = apiClient.get(API_RANKING.concat('user'))
let dataLength = ref(null)

async function fetchData(){
    try{
        getData.value = await apiClient.get(API_RANKING.concat('user'))
        dataLength.value = getData.value.length
        console.log(endItem.value >= dataLength.value)
        setTimeout(() => dataLoaded.value = true, 1000)
    }catch{

    }
}

function goNextPage(){
    initItem.value += entries.value
    endItem.value += entries.value
}

function goPreviousPage(){
    initItem.value -= entries.value
    endItem.value -= entries.value
}

let checkLength = computed(() => endItem.value >= dataLength.value ? true : false )

onMounted(() => {
    fetchData()
})

</script>

<template>
    <div v-if="!dataLoaded" class="loader">
        <p aria-busy="true">Cargando Ranking...</p>
    </div>
    <div v-else class="table-wrapper">
        <h2>🎖️ Ranking </h2>
        <table role="grid">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Jugador</th>
                    <th>Puntos</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in getData.splice(initItem, endItem)" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.points }}</td>
                    <td>{{ dateToLocale(user.created_at) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="buttons-wrapper">
            <button href="#" role="button" @click="goNextPage()" :disabled="initItem === 0">
            Anterior
            </button>
            <button href="#" role="button" @click="goPreviousPage()" :disabled="checkLength">
            Siguiente
            </button>
        </div>
    </div>
</template>

<style scoped>

h2{
    margin-bottom: 0.5rem;
}

.table-wrapper{
    width: 100%;
}

.buttons-wrapper{
    display: flex;
    justify-content: space-between;
}

button{
    width: fit-content;
}
</style>