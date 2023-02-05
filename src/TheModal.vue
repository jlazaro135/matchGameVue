<script setup>

defineProps({
    level: {
        type: Number,
        default: 1
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    nextLevel: {
        type: Number,
        default: 2
    }
})

</script>

<template>
<dialog :open="isOpen">
  <article>
    <h3>Nivel {{ level }} superado</h3>
    <p>
        Has conseguido completar el nivel en: 
    </p>
    <p>
        xx-tiempo y xx intentos
    </p>
    <footer>
      <button href="#confirm" role="button">Siguiente Nivel</button>
    </footer>
  </article>
</dialog>
</template>

<style scoped>
</style>