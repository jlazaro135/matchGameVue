<script setup>
import { ref } from 'vue';
import TheGrid from './TheGrid.vue';

let isFirstRound = ref(false)
let isSecondRound = ref(true)
let isThirdRound = ref(false)
let isFourthRound = ref(false)
let isFifthRound = ref(false)


</script>

<template>
  <main class="container">
    <div v-if="isFirstRound">
        <TheGrid 
        :cards = 8
        :level = 1
        :next-level = 2
        />
    </div>
    <div v-else-if="isSecondRound">
        <TheGrid 
        :cards = 12
        :level = 2
        :next-level = 3
        />
    </div>
    <div v-else-if="isThirdRound">
        <TheGrid 
        :cards = 16
        :level = 3
        :next-level = 4
        />
    </div>
    <div v-else-if="isFourthRound">
        <TheGrid 
        :cards = 20
        :level = 4
        :next-level = 5
        />
    </div>
    <div v-else-if="isFifthRound">
        <TheGrid 
        :cards = 24
        :level = 5
        :next-level = 99
        />
    </div>
  </main>
</template>

<style scoped>

</style>
