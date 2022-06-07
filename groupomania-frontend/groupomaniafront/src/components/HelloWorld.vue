<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <header>
    <div class="greetings">
      <h1 class="green">{{ msg }}</h1>
    </div>
  </header>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
