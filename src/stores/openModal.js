import { defineStore } from "pinia";
import { ref } from "vue";

export const useOpenModalStore = defineStore("modal", () => {

    let isOpen = ref(false)

    return {
       isOpen
    }
})