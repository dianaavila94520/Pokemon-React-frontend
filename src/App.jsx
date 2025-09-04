import './fanta.css';
import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import { fetchPokeMonNameArr } from './utils/fetchPokeMonNameArr';

import { useState, useEffect } from 'react';
import PokeCard from './components/PokeCard';
import fetchPokemonData from './utils/fetchPokeDataDetails';
import Modal from './components/Modal';
function App() {
 const [selectedPokemon, setSelectedPokemon] = useState('');
 const [dataPokemon, setDataPokemon] = useState(``);
 const [dataPokemonObj, setDataPokemonObj] = useState(``);
 const [showSideMenu, setShowSideMenu] = useState(true);

 function handleToggleMenu() {
  setShowSideMenu(!showSideMenu);
 }
 function handleCloseMenu() {
  setShowSideMenu(false);
 }
 useEffect(() => {
  const myresult = fetchPokeMonNameArr();
  myresult?.then((e) => {
   if (!e) {
    return;
   }
   setSelectedPokemon(e);
  });
 }, [selectedPokemon]);
 useEffect(() => {
  const thename = dataPokemon;
  const pokeObj = fetchPokemonData(thename);
  pokeObj.then((ele) => {
   setDataPokemonObj(ele);
  });
 }, [dataPokemon]);
 return (
  <>
   <Header handleToggleMenu={handleToggleMenu} />
   <SideNav
    handleCloseMenu={handleCloseMenu}
    selectedPokemon={selectedPokemon}
    setSelectedPokemon={setSelectedPokemon}
    setDataPokemon={setDataPokemon}
    handleToggleMenu={handleToggleMenu}
    showSideMenu={showSideMenu}
   />
   <PokeCard dataPokemonObj={dataPokemonObj} />
  </>
 );
}

export default App;
