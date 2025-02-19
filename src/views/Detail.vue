<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from '@/components/Navbar.vue';
import { useToast } from "vue-toastification";

const toast =  useToast();

const route = useRoute();
const pokemon = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");
const activeTab = ref("about");
const isCatching = ref(false);
const caughtMessage = ref(null);
let capturedPokemon = JSON.parse(localStorage.getItem("pokemonList")) || [];

const fetchPokemonDetail = async () => {
    isLoading.value = true;
    errorMessage.value = "";

    try {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${route.params.name}`
        );
        if (!res.ok) throw new Error("Gagal Mengambil Pokemon");
        const data = await res.json();

        pokemon.value = {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            image: data.sprites.other["official-artwork"].front_default || "/default.png",
            types: data.types.map(type => type.type.name)
        };
        console.log(pokemon.value);
    } catch (error) {
        errorMessage.value = "Error saat Fetching Data Pokemon";
    } finally {
        isLoading.value = false;
    }
};

const catchPokemon = () => {
    if (!pokemon.value) return;

    caughtMessage.value = null;
    isCatching.value = true;

    const success = Math.random() < 0.5; // 50% chance to catch the Pokemon

    if (success) {
        if (!capturedPokemon.some((p) => p.id === pokemon.value.id)) {
            const newPokemon = {
                id: pokemon.value.id,
                name: pokemon.value.name,
                types: pokemon.value.types,
                image: pokemon.value.image,
                uniqueId: Date.now(),
            };

            capturedPokemon.push(newPokemon);
            localStorage.setItem("pokemonList", JSON.stringify(capturedPokemon));
            window.dispatchEvent(new Event("storage"));
            toast.success("Berhasil menangkap pokemon");

            caughtMessage.value = { success: true, message: "Pokemon caught successfully!" };
        } else {
            caughtMessage.value = { success: false, message: "You already have this Pokemon!" } ;
            toast.error("Gagal menangkap pokemon");
        }
    } else {
        caughtMessage.value = { success: false, message: "Failed to catch the Pokemon!" };
        toast.error("Gagal menangkap pokemon");
    }

    isCatching.value = false;
};

const closeMessage = () => {
    caughtMessage.value = null;
};

watch(() => route.params.name, fetchPokemonDetail, { immediate: true });
</script>

<template>
    <Navbar />
    <div class="container min-h-screen flex items-center justify-center p-4">
        <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="px-10 pt-10">
          <img
            :src="pokemon.image"
            alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ pokemon.name }}</h2>
          <p>{{ pokemon.types.join(",") }}</p>
          <div class="card-actions">
            <button
            @click="catchPokemon" 
            class="btn btn-primary">Catch</button>
          </div>
        </div>
      </div>
    </div>
</template>


<style>

</style>