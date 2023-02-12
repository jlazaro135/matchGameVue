import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useTimerStore } from '../stores/timer';
import  { useCounterStore } from '../stores/counter';
import  { useGridStore } from '../stores/grid';

export const usePointsStore = defineStore("points", () => {
    
    const useTimer = useTimerStore()
    const useCounter = useCounterStore()
    const useGrid = useGridStore()

    let startingPoints = 1000 
    let banForTime = 100
    let banForMistake = 50
    let levelPointsArr = []
    let totalBanForTime
    let totalBanForMistake

    let finalPoints = () =>{
        let secondsSectionPassed = Math.floor(useTimer.totalLevelSeconds/Math.max(10, 10 + ((useGrid.currentLevel - 1) * 5)))
        totalBanForTime = 0
        totalBanForMistake = 0

        if(secondsSectionPassed >= 1 ){
            totalBanForTime = secondsSectionPassed * (banForTime * useGrid.currentLevel)
        }
        if(useCounter.levelCounter >= 1){
            totalBanForMistake = useCounter.levelCounter * banForMistake
        }
        return (startingPoints * useGrid.currentLevel) - totalBanForMistake - totalBanForTime
    }
    
    return {
        levelPointsArr,
        finalPoints
    }
})