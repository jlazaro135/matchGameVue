import { defineStore } from "pinia";

export const useResultStore = defineStore("result", () => {

    let resultsArr = [
    ]

    return {
        resultsArr
    }
})