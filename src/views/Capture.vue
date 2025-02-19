<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";

const capturedPokemon = ref([]);
const showConfirmDialog = ref(false);
const selectedPokemon = ref(null);
const dialogRef = ref(null);

onMounted(() => {
    capturedPokemon.value = JSON.parse(localStorage.getItem("pokemonList")) || [];
});

const deletePokemon = () => {
    if (!selectedPokemon.value) return;
    capturedPokemon.value = capturedPokemon.value.filter(
        (pokemon) => pokemon.uniqueId !== selectedPokemon.value.uniqueId
    );
    localStorage.setItem("pokemonList", JSON.stringify(capturedPokemon.value));
    dialogRef.value.close();
};

const confirmDelete = (pokemon) => {
    selectedPokemon.value = pokemon;
    dialogRef.value.showModal();
};
</script>

<template>
  <Navbar />

  <div class="container min-h-screen flex items-center justify-center p-4 gap-4">
    <div v-if="capturedPokemon.length === 0" class="mt-4 text-dark text-xl text-center flex justify-center h-full">
        Maaf belum ada pokemon yang kamu tangkap
    </div>
    <div class="card bg-base-100 w-96 shadow-xl " v-for="pokemon in capturedPokemon" :key="pokemon.uniqueId">
      <div class="card-body">
        <div class="card-actions justify-end">
          <button @click="confirmDelete(pokemon)" class="btn btn-square btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img :src="pokemon.image" alt="">
        </div>
        <h2>{{ pokemon.name }}</h2>
        <p>{{ pokemon.types.join(",") }}</p>
      </div>
    </div>
  </div>

  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
        <h2 class="text-xl font-semibold text-dark-50 mb-4">Lepaskan</h2>
    
    <div class="modal-action">
        <button @click="deletePokemon" class="btn">Lepaskan</button>
        <button @click="dialogRef.close()" class="btn">Tidak</button>
    </div>
</div>
  </dialog>
</template>
