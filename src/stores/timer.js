import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useTimerStore = defineStore("timer", () => {

    let levelMinutes = ref('00')
    let levelSeconds = ref('00')
    let totalTimer = ref(0)
    let stopInterval = ref(false)

    let totalLevelSeconds = ref(0);

    let levelInterval

    watchEffect(() => {
        if(stopInterval.value){
            clearInterval(levelInterval)
            return
        }
        setTimeout(() => levelInterval = setInterval(setTime, 1000), 2000)
    })

    function setTime() {
        ++totalLevelSeconds.value;
        levelSeconds.value = pad(totalLevelSeconds.value % 60);
        levelMinutes.value = pad(parseInt(totalLevelSeconds.value / 60));
      }

    function pad(val) {
        let valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }

    return {
        totalTimer,
        levelSeconds,
        levelMinutes,
        totalLevelSeconds,
        stopInterval
    }
})