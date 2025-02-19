<script setup>
import { ref, onMounted,computed } from "vue";
import { useRouter } from "vue-router";

const pokemonList = ref([]);
const showCount = ref(12);
const totalPokemon = ref(24);
const router = useRouter()
const query = ref("");

const fetchPokemon = async () => {
  try{
    const promises = Array.from({length: totalPokemon.value}, (_, i) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => 
    res.json()
  )
);

const result = await Promise.allSettled(promises);
pokemonList.value = result
    .filter((result) => result.status === "fulfilled")
    .map((result) => ({
      id: result.value.id,
      name: result.value.name,
      image: result.value.sprites.other["official-artwork"].front_default,
    }));
  }catch(error){
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchPokemon);

const showMore = () => {
  if(showCount.value < totalPokemon.value){
    showCount.value +=5;
  }
};

const filteredPokemon = computed(() => {
  return pokemonList.value
  .filter((pokemon) =>
  pokemon.name.toLowerCase().includes(query.value.toLowerCase())
)
.slice(0,showCount.value);
});
</script>


<template>
  <div class="container m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <div @click="router.push(`/pokemon/${pokemon.name}`)" v-for="pokemon in filteredPokemon" :key="pokemon.id" class="card bg-base-100 w-64 shadow-xl">
  <figure>
    <img
      :src="pokemon.image"
      :alt="pokemon.name" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{{ pokemon.name }}!</h2>
    <p>000{{ pokemon.id }}</p>
  </div>
</div>
  </div>
</template>