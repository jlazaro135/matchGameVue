<script setup>
import { ref, onMounted } from 'vue';
import { apiClient } from '../js/apiClient';
import {API_RANKING}  from '../js/const'
import { dateToLocale }  from '../js/utils'

let getData = ref(null)

getData.value = apiClient.get(API_RANKING.concat('user'))

async function fetchData(){
    try{
        getData.value = await apiClient.get(API_RANKING.concat('user'))
    }catch{

    }
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <h2>🎖️ Ranking </h2>
    <table role="grid">
        <thead>
            <tr>
                <th>Jugador</th>
                <th>Puntos</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in getData">
                <td>{{ user.name }}</td>
                <td>{{ user.points }}</td>
                <td>{{ dateToLocale(user.created_at) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

h2{
    margin-bottom: 0.5rem;
}

</style>