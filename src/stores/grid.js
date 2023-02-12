import { defineStore } from "pinia";
import { ref } from "vue";

export const useGridStore = defineStore("grid", () => {

    let isStartView = ref(false)
    let isFirstRound = ref(false)
    let isSecondRound = ref(false)
    let isThirdRound = ref(false)
    let isFourthRound = ref(false)
    let isFifthRound = ref(false)
    let isEndView = ref(true)
    let isRankingView = ref(false)
    let currentLevel = ref(null)

    return {
        currentLevel,
        isStartView,
        isFirstRound,
        isSecondRound,
        isThirdRound,
        isFourthRound,
        isFifthRound,
        isEndView,
        isRankingView
    }
})