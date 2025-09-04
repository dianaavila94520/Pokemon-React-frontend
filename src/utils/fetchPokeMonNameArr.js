import { arrCache } from '../cache/allCaches.js';

async function fetchPokeMonNameArr(
 myUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0'
) {
 if (arrCache.has(myUrl)) {
  arrCache.get(myUrl);
  return;
 } else {
  const finalUrl = myUrl;
  const res = await fetch(finalUrl);
  const pokemonData = await res.json();
  arrCache.set(myUrl, pokemonData);

  return pokemonData;
 }
}

export { fetchPokeMonNameArr };
