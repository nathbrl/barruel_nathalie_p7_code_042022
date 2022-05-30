<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <main>
      <TheWelcome />
      <form>
         <label for="mail">Votre e-mail</label>
         <input type="mail" placeholder="e-mail" class="input-email">
         <label for="password">Votre Mot de passe</label>
         <input type="password" placeholder="mot de passe" class="input-password">
         <div>
            <button>Submit</button>
         </div>
      </form>
  </main>
</template>
