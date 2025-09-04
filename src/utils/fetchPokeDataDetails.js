import { arrPokeDetailsCache } from '../cache/allCaches.js';

export default async function fetchPokemonData(selectedPokemon) {
 let Loading = true;
 if (arrPokeDetailsCache.has(selectedPokemon)) {
  return arrPokeDetailsCache.get(selectedPokemon);
 }
 try {
  const finalUrl = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  const res = await fetch(finalUrl);
  const pokemonData = await res.json();
  arrPokeDetailsCache.set(selectedPokemon, pokemonData);
  return pokemonData;
 } catch (err) {
  console.log(err.message);
 } finally {
  Loading = false;
 }
}
