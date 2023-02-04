<script setup>
import { ref, toRefs } from 'vue';
import { countryCodeIban } from '../js/flags';
import shuffleArray from '../js/utils';

const props = defineProps({
    cards: {
        type: Number,
    }
})

const { cards } = toRefs(props)

let cardsNumber = cards.value

let flagsForGame = []


for (let i=0; i<(cardsNumber/2); i++){
    const randomFlagIndex = Math.floor(Math.random() * countryCodeIban.length);
    let ibanFlag = countryCodeIban[randomFlagIndex]
    flagsForGame = [...flagsForGame ,...Array(2).fill(ibanFlag)]
}


shuffleArray(flagsForGame)

let selectedFlags = ref([])

let guessedFlags = ref([])


function flipCard(index, flag){
    if(guessedFlags.value.some(guessedFlag => guessedFlag === flag))return
    if(selectedFlags.value.length === 2)return
    let indexExist = selectedFlags.value.some(card => card.index === index)
    if(indexExist)return
    selectedFlags.value = [...selectedFlags.value, {index: index, flag: flag}]
    if(selectedFlags.value.length === 2){
        if(selectedFlags.value[0].flag === selectedFlags.value[1].flag){
            setTimeout(function(){
                guessedFlags.value = [...guessedFlags.value, selectedFlags.value[0].flag]
            }, 799)
        }
        setTimeout(function(){
            selectedFlags.value = []
        },800)
    }

}

</script>   

<template>      
    <div class="o-flex"> 
        <div class="card" v-for="(ibanFlag, index) in flagsForGame" :key="index">
            <div class="card-inner" 
            :class="
            {'card-is-flipped': selectedFlags.some(card => card.index === index)},
            {'card-is-guessed': guessedFlags.some(card => card === ibanFlag)}
            " 
            @click="flipCard(index, ibanFlag)">
                <div class="flag-wrapper card-front">
                </div>
                <div class="flag-wrapper card-back">
                    <img crossorigin="anonymous" class="img" :src="`https://countryflagsapi.com/svg/${ibanFlag}`" alt="bander">
                </div>
            </div>
        </div>
    </div>
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
    place-content: center;
}

.img{
    border-radius: 5px;
}
</style>