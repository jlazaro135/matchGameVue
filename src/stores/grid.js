import { defineStore } from "pinia";
import { ref } from "vue";

export const useGridStore = defineStore("grid", () => {

    let isFirstRound = ref(true)
    let isSecondRound = ref(false)
    let isThirdRound = ref(false)
    let isFourthRound = ref(false)
    let isFifthRound = ref(false)
    let isTheEnd = ref(false)

    return {
        isFirstRound,
        isSecondRound,
        isThirdRound,
        isFourthRound,
        isFifthRound,
        isTheEnd,
    }
})