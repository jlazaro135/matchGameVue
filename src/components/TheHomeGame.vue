<script setup>
import TheGrid from './TheGrid.vue';
import TheStart from './TheStart.vue';
import TheEnd from './TheEnd.vue';
import TheRanking from './TheRanking.vue';
import { useGridStore } from '../stores/grid';
import { storeToRefs } from 'pinia';

const useGrid = useGridStore()
const {isStartView, isFirstRound, isSecondRound, isThirdRound, isFourthRound,isFifthRound, isEndView, isRankingView} = storeToRefs(useGrid)

</script>

<template>
  <main class="container">
    <div class="start-view" v-if="isStartView">
        <TheStart />
    </div>
     <div class="grid-wrapper" v-if="isFirstRound">
        <TheGrid 
        :cards = 8
        :level = 1
        :next-level = 2
        grid = 'first'
        />
    </div>
    <div class="grid-wrapper" v-else-if="isSecondRound">
        <TheGrid 
        :cards = 12
        :level = 2
        :next-level = 3
        grid = 'second'
        />
    </div>
    <div class="grid-wrapper" v-else-if="isThirdRound">
        <TheGrid 
        :cards = 16
        :level = 3
        :next-level = 4
        grid = 'third'
        />
    </div>
    <div class="grid-wrapper" v-else-if="isFourthRound">
        <TheGrid 
        :cards = 20
        :level = 4
        :next-level = 5
        grid = 'fourth'
        />
    </div>
    <div class="grid-wrapper" v-else-if="isFifthRound">
        <TheGrid 
        :cards = 24
        :level = 5
        :next-level = 99
        grid = 'fifth'
        />
    </div>
    <div class="end-view" v-else-if="isEndView">
        <TheEnd/>
    </div>
    <div class="end-view" v-else-if="isRankingView">
        <TheRanking/>
    </div>
  </main>
</template>

<style scoped>
.start-view{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 400px;
    width: 100%;
}

.end-view{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 1rem 0;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 600px;
    width: 100%;
}

.grid-wrapper{
    position: static;
}

.container{
    position: static;
}
</style>
