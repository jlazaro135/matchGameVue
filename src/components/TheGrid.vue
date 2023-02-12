<script setup>
import  { useOpenModalStore } from '../stores/openModal';
import  { useCounterStore } from '../stores/counter';
import { useTimerStore } from '../stores/timer';
import { useGridStore } from '../stores/grid';
import { ref, toRefs, onMounted } from 'vue';
import { countryCodeIban } from '../js/flags';
import shuffleArray from '../js/utils';
import TheModal from './TheModal.vue';
import TheDisplayGame from './TheDisplayGame.vue';

const useTimer = useTimerStore()
const useOpenModal = useOpenModalStore() 
const useCounter = useCounterStore() 
const useGrid = useGridStore() 

const props = defineProps({
    cards: {
        type: Number,
    },
    level: {
        type: Number,
        default: 1,
    },
    nextLevel: {
        type: Number,
        default: 2
    },
    grid: String
})

const { cards,level } = toRefs(props)

useGrid.currentLevel = level.value

let cardsNumber = cards.value

let flagsForGame = []

let countryCodeIbanCopy = [...countryCodeIban]


for (let i=0; i<(cardsNumber/2); i++){
    const randomFlagIndex = Math.floor(Math.random() * countryCodeIbanCopy.length);
    let country = countryCodeIbanCopy[randomFlagIndex]
    countryCodeIbanCopy.splice(randomFlagIndex, 1)
    flagsForGame = [...flagsForGame ,...Array(2).fill(country)]
}

shuffleArray(flagsForGame)

let selectedFlags = ref([])

let guessedFlags = ref([])

let flipAllCards = ref(false)

let cardsAreFlipped = ref(true)

function flipCard(index, flag){
    if (cardsAreFlipped.value) return
    if(guessedFlags.value.some(guessedFlag => guessedFlag.code === flag.code))return
    if(selectedFlags.value.length === 2)return
    let indexExist = selectedFlags.value.some(card => card.index === index)
    if(indexExist)return
    selectedFlags.value = [...selectedFlags.value, {index: index, flag: flag}]
    if(selectedFlags.value.length === 2){
        if(selectedFlags.value[0].flag.code === selectedFlags.value[1].flag.code){
            setTimeout(function(){
                guessedFlags.value = [...guessedFlags.value, selectedFlags.value[0].flag]
                selectedFlags.value = []
                if(guessedFlags.value.length === flagsForGame.length/2){
                    useTimer.stopInterval = true
                    setTimeout(()=> {
                    useOpenModal.isOpen = true
                    }, 500)
                }
            }, 200)
            return
        }
        setTimeout(function(){
            selectedFlags.value = []
        },1000)
        useCounter.totalCounter ++
        useCounter.levelCounter ++
    }
}

onMounted(() => {
    setTimeout(() => flipAllCards.value = true, 1000 )
    setTimeout(() => {
        flipAllCards.value = false
        cardsAreFlipped.value = false
    } , 2000 )
})


</script>   

<template>      
    <div class="o-flex"> 
        <div class="card" v-for="(country, index) in flagsForGame" :key="index">
            <div class="card-inner" 
            :class="
            {'card-is-flipped': selectedFlags.some(card => card.index === index) || flipAllCards},
            {'card-is-guessed': guessedFlags.some(card => card.code === country.code)}
            " 
            @click="flipCard(index, country)">
                <div class="flag-wrapper card-front">
                </div>
                <div class="flag-wrapper card-back">
                    <img crossorigin="anonymous" class="img" :src="`https://flagcdn.com/w160/${country.code}.png`" alt="bandera">
                    <span class="country-name">{{ country.country }}</span>
                </div>
            </div>
        </div>
    </div>
    <TheModal
    :level="level" 
    :nextLevel="nextLevel"
    :grid="grid"
    />
    <TheDisplayGame 
    :level="level"
    />
</template>

 
<style scoped>
.o-flex{
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    max-width: 450px;
    justify-content: center;
    min-height: 100vh;
    margin: 0 auto;
    gap: 0.5rem;
}

.card{
    background-color: transparent;
    border-radius: 5px;
    display: grid;
    place-items: center;
    perspective: 1000px;
    flex: 1 1 23%;
    
}
.card-inner{
    position: relative;
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    text-align: center;
    transition: transform 0.4s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border: 5px solid #fff;
    border-radius: 5px;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-is-flipped{
transform: rotateY(180deg);
}

.card-is-guessed{
transform: rotateY(180deg);
position: relative;
background-color: transparent;
animation: rotateCardGuessed 500ms forwards;
}

.card-is-guessed:after{
    content: 'Bien hecho!';
    display: grid;
    place-items: center;
    transform: rotateY(180deg);
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #22bb34d0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
}

.card-front{
    background: repeating-linear-gradient(45deg, #007fff 0%, #007fff 5%, #ffffff 5%, #ffffff 10%);
}
.card-back{
    transform: rotateY(180deg);
}

.flag-wrapper{
    padding: 0.5rem;
    width: 100%;
    height: 100%;
    background-color: #dfdfdf;
    display: grid;
    place-content: space-between;
    justify-content: center;
    gap: 0.1rem;
}

.img{
    border-radius: 5px;
    max-height: 3.75rem;
}
.country-name{
    font-size: 0.5rem;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
}

@keyframes rotateCardGuessed{
    0% {
        transform:rotateY(180deg) rotate(0);

    }
    100% {
        transform:rotateY(180deg) rotate(360deg);
    }
}
</style>