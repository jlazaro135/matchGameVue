<script setup>
import { ref } from 'vue';
import TheGrid from './TheGrid.vue';

let isFirstRound = ref(true)
let isSecondRound = ref(false)
let isThirdRound = ref(false)
let isFourthRound = ref(false)
let isFifthRound = ref(false)


</script>

<template>
  <main class="container">
    <div v-if="isFirstRound">
        <TheGrid 
        :cards = 8
        />
    </div>
    <div v-else-if="isSecondRound">
        <TheGrid 
        :cards = 12
        />
    </div>
    <div v-else-if="isThirdRound">
        <TheGrid 
        :cards = 16
        />
    </div>
    <div v-else-if="isFourthRound">
        <TheGrid 
        :cards = 20
        />
    </div>
    <div v-else-if="isFifthRound">
        <TheGrid 
        :cards = 24
        />
    </div>
  </main>
</template>

<style scoped>

</style>
