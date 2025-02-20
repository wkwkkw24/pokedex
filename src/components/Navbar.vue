

<template>
    <div class="navbar bg-base-100">
     <div class="flex-1">
      <router-link to="/">
        <img src="../assets/logo_pokemon.png" alt="" class="w-[105px]">
      </router-link>
     </div>
     <router-link to="/capture"><img src="../assets/pokecatch.png" alt="" class="w-5 h-auto ml-3 cursor-pointer">

       <div class="py-4 px-auto m-3">
        <!-- <img src="/pngegg.png" alt="" class="w-[50px]"> -->
        <button>{{ caughtCount }} Captured</button>
       </div>
     </router-link>
     
   </div>
   </template>

   <script setup>
   import { ref, onMounted, onUnmounted } from "vue";
   import { RouterLink } from "vue-router";
   const caughtCount = ref(0);

   const updateCount = () => {
    const storedPokemon = JSON.parse(localStorage.getItem("pokemonList")) || [];
    caughtCount.value = storedPokemon.length;
   };

   onMounted(() =>{
    updateCount();
    window.addEventListener("storage", updateCount);
   });

   onUnmounted(() => {
    window.removeEventListener("storage", updateCount);
   });
  </script>
   
   