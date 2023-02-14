<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiClient } from '../js/apiClient';
import {API_RANKING}  from '../js/const'
import { dateToLocale }  from '../js/utils'

let getData = ref([])
let dataLoaded = ref(false)
let initItem = ref(0)
let endItem = ref(10)
let entries = ref(10)
let select = ref('select')

let dataLength = ref(null)

async function fetchData(){
    try{
        getData.value = await apiClient.get(API_RANKING.concat('user'))
    
        dataLength.value = getData.value.length
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

function handleChange(){
    entries.value = +select.value.value
    initItem.value = 0
    endItem.value = +select.value.value
}

function reload(){
    window.location.reload()
}

let checkLength = computed(() => endItem.value >= dataLength.value ? true : false )

onMounted(() => {
    fetchData()
})

</script>

<template>
    <h2>🎖️ Ranking </h2>
    <div v-if="!dataLoaded" class="loader">
        <p aria-busy="true">Cargando Ranking...</p>
    </div>
    <div v-else class="table-wrapper">
        <div class="select-wrapper">
            <label for="showItems">Nº resultados</label>
            <select @change="handleChange()" name="showItems" id="select" ref="select">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="25" :disabled="dataLength < 25">25</option>
                <option value="50" :disabled="dataLength < 25">50</option>
            </select>
        </div>
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
                <tr v-for="(user, index) in getData.slice(initItem, endItem)" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.points }}</td>
                    <td>{{ dateToLocale(user.created_at) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="buttons-wrapper">
            <button href="#" role="button" @click="goPreviousPage()" :disabled="initItem === 0">
            Anterior
            </button>
            <button class="secondary" @click="reload()">JUGAR OTRA VEZ</button>
            <button href="#" role="button" @click="goNextPage()" :disabled="checkLength">
            Siguiente
            </button>
        </div>
    </div>
</template>

<style scoped>

h2{
    margin-bottom: auto;
}

.table-wrapper, .loader{
    width: 100%;
    margin-bottom: auto;
}

.buttons-wrapper{
    display: flex;
    justify-content: space-between;
}

button{
    width: fit-content;
}

.select-wrapper{
    width: fit-content;
    margin-left: auto;
}
</style>