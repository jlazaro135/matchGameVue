import { defineStore } from "pinia";
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
    let rewardForFullMatch = 100
    let levelPointsArr = []
    let totalBanForTime
    let totalBanForMistake

    let finalPoints = () =>{
        let secondsSectionPassed = Math.floor(useTimer.totalLevelSeconds/Math.max(10, 10 + ((useGrid.currentLevel - 1) * 5)))
        totalBanForTime = 0
        totalBanForMistake = 0
        rewardForFullMatch = rewardForFullMatch * useGrid.currentLevel

        if(secondsSectionPassed >= 1 ){
            totalBanForTime = secondsSectionPassed * (banForTime * useGrid.currentLevel)
        }
        if(useCounter.levelCounter >= 1){
            totalBanForMistake = useCounter.levelCounter * banForMistake
            rewardForFullMatch = 0
        }
        return {
            points: (startingPoints * useGrid.currentLevel) - totalBanForMistake - totalBanForTime,
            extra: rewardForFullMatch,
            totalPoints(){
                return this.extra + this.points
            }
        } 
    }
    
    return {
        levelPointsArr,
        finalPoints
    }
})