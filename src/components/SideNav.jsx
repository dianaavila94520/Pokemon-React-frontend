import { arrCache } from '../cache/allCaches';
import { getFullPokedexNumber } from '../utils';
import { fetchPokeMonNameArr } from '../utils/fetchPokeMonNameArr';
import { useState } from 'react';

export default function SideNav(props) {
 const {
  selectedPokemon,
  setSelectedPokemon,
  handleCloseMenu,
  showSideMenu,
  handleToggleMenu,
  setDataPokemon,
 } = props;
 const [searchValue, setSearchValue] = useState('');

 function handleNextClick(myselectedPokemon) {
  if (arrCache.has(selectedPokemon?.next)) {
   setSelectedPokemon(arrCache.get(selectedPokemon.next));
  } else {
   const myNewResult = fetchPokeMonNameArr(myselectedPokemon.next);
   myNewResult?.then((e) => {
    if (!e?.next) {
     return;
    }

    setSelectedPokemon(e);
   });
  }
 }

 function handlePrevClick(myselectedPokemon) {
  const res = arrCache.has(myselectedPokemon);

  if (res) {
   setSelectedPokemon(arrCache.get(myselectedPokemon));
  } else {
   if (arrCache.has('https://pokeapi.co/api/v2/pokemon/?limit=4&offset=0')) {
    const firRes = arrCache.get(
     'https://pokeapi.co/api/v2/pokemon/?limit=4&offset=0'
    );
    setSelectedPokemon(firRes);
    return;
   }
  }
 }

 const filteredPokemon = props?.selectedPokemon?.results?.filter(
  (ele, eleIndex) => {
   // if full pokedex number includes the current search value, return true
   if (getFullPokedexNumber(eleIndex).includes(searchValue)) {
    return true;
   }

   // if the pokemon name includes the current search value, return true
   if (ele.name.toLowerCase().includes(searchValue.toLowerCase())) {
    return true;
   }

   // otherwise, exclude value from the array
   return false;
  }
 );

 return (
  <nav className={' ' + (!showSideMenu ? ' open' : '')}>
   <div className={'header ' + (!showSideMenu ? ' open' : '')}>
    <button onClick={handleToggleMenu} className="open-nav-button">
     {console.log('btn')}
     <i className="fa-solid fa-arrow-left-long"></i>
    </button>
    <h1 className="text-gradient">Pokédex</h1>
   </div>
   <input
    name="Pokemon_name"
    placeholder="E.g. 001 or Bulba..."
    value={searchValue}
    onChange={(e) => {
     setSearchValue(e.target.value);
    }}
   />
   {filteredPokemon &&
    filteredPokemon.map(({ name, url }, pokemonIndex) => {
     const digitString = url.slice(-6);

     const digitOnly = digitString.replace(/\D/g, '');
     const num = parseFloat(digitOnly);

     return (
      <button
       onClick={() => {
        // setSelectedPokemon(truePokedexNumber);
        setDataPokemon(name);
        handleCloseMenu();
       }}
       key={pokemonIndex}
       className={'nav-card ' + (!name ? ' nav-card-selected' : ' ')}
      >
       <p>
        #{' '}
        {`${
         num > 999 ? num : num > 99 ? num : num > 9 ? `0${num}` : `00${num}`
        }`}
       </p>
       <p>{name}</p>
      </button>
     );
    })}
   <div className="next-prev-btn">
    <div className="prev-btn-container">
     <button onClick={() => handlePrevClick(selectedPokemon.previous)}>
      Prev
     </button>
    </div>

    <div className="next-btn-container">
     <button onClick={() => handleNextClick(selectedPokemon)}>Next</button>
    </div>
   </div>
  </nav>
 );
}
