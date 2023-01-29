<script setup>
import { ref } from 'vue';


defineProps({
    cards: {
        type: Number,
    }
})


let selectedCard = ref([])


let flag = 'https://countryflagsapi.com/svg/076'
let flag2 = 'https://countryflagsapi.com/svg/040'
let flag3 = 'https://countryflagsapi.com/svg/070'

function flipCard(index){
    if(selectedCard.value.length === 2)return
    let indexExist = selectedCard.value.some(item => item === index)
    if(indexExist){
        // selectedCard.value.splice(selectedCard.value.indexOf(index), 1)
        return
    }
    selectedCard.value = [...selectedCard.value, index]
    if(selectedCard.value.length === 2){
        setTimeout(function(){
            selectedCard.value  = []
        },1000)
    }
}


</script>   

<template>      
    <div class="o-flex"> 
        <div class="card" v-for="(card, index) in cards">
            <div class="card-inner" :class="{'card-is-flipped': selectedCard.some(item => item === index)}" @click="flipCard(index)">
                <div class="flag-wrapper card-front">
                </div>
                <div class="flag-wrapper card-back">
                    <img crossorigin="anonymous" class="img" :src="flag" alt="bander">
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
    transition: transform 0.6s;
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
    background-color: #f3f3f3;
    display: grid;
    place-content: center;
}

.img{
    border-radius: 5px;
}
</style>