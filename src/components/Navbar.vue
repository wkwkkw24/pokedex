

<template>
    <div class="navbar bg-base-100">
     <div class="flex-1">
      <router-link to="/">
        <img src="../assets/pokemon-logo.png" alt="" class="w-[105px]">
      </router-link>
     </div>
     <router-link to="/capture">
       <div class="py-4 px-auto m-3">
        <!-- <img src="/pngegg.png" alt="" class="w-[50px]"> -->
        <button>{{ caughtCount }} Captured</button>
       </div>
     </router-link>
     <div class="flex-none gap-2">
       <div class="form-control">
         <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
       </div>
     </div>
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
   
   