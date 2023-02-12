import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {

    let levelCounter = ref(0)
    let totalCounter = ref(0)
    let levelCounterArr = ref([])

    return {
        levelCounter,
        totalCounter,
        levelCounterArr
    }
})