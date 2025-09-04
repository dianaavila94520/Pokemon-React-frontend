import { useState } from 'react';
import Modal from './Modal';
import TypeCard from './TypeCard';
import { skillCachePokemon } from '../cache/allCaches';
function PokeCard(props) {
 const { name, stats, types, moves, sprites } = props?.dataPokemonObj || {};

 const [skill, setSkill] = useState(null);
 const [loadingSkill, setloadingSkill] = useState(false);

 const fetchMoreSkillData = async (move, moveUrl) => {
  if (loadingSkill || !moveUrl || skillCachePokemon.has(move) === undefined) {
   console.log(setSkill(skillCachePokemon.get(move)));
   console.log('first');
   return;
  }
  if (skillCachePokemon.has(move)) {
   setSkill(skillCachePokemon.get(move));
   console.log('found move in cache');
   return;
  }

  try {
   setSkill(true);
   const res = await fetch(moveUrl);
   const responseJson = await res.json();
   console.log('fetched move from Api');
   const myDescription = responseJson?.flavor_text_entries?.filter((val) => {
    return val?.language?.name === 'en';
   })[0]?.flavor_text;
   const skillData = {
    name: move,
    myDescription,
   };

   setSkill(skillData);
   skillCachePokemon.set(move, skillData);
  } catch (error) {
   console.log(error);
  } finally {
   setloadingSkill(false);
  }
 };

 // check if the selected pokemon information is available in the cache
 // 1. define the cache
 // 2. check if the selected pokemon is in the cache, otherwise fetch from the API
 //read from cache
 // we passed all the cache stuff to no avail and now need to fetch the data from the api

 function handleCloseModal() {
  setSkill(null);
 }

 return (
  <div className="poke-card">
   {skill && (
    <Modal handleCloseModal={handleCloseModal}>
     <div>
      <h6>Skill</h6>
      <h2> {skill?.name?.replaceAll('-', ' ')}</h2>
     </div>
     <div>
      <h6>Description</h6>
      <p>{skill?.myDescription}</p>
     </div>
    </Modal>
   )}
   {props !== undefined && (
    <div className="undefined-or-content">
     <div>
      <h2>{name}</h2>
     </div>
     <div className="type-container">
      {types?.map((typeObj, index) => {
       return <TypeCard key={index} mytype={typeObj?.type} />;
      })}
     </div>

     {sprites && (
      <img
       className="default-img"
       src={sprites?.other?.['official-artwork']?.front_default}
       alt={`${name}-front_default-image`}
      />
     )}
     <div className="img-container">
      {sprites?.front_shiny_female && (
       <img
        className="default-img"
        src={sprites.front_shiny_female}
        alt={`${name}-front_shiny_female`}
       />
      )}
      {sprites?.back_default && (
       <img
        className="default-img"
        src={sprites.back_default}
        alt={`${name}-back_default`}
       />
      )}
      {sprites?.back_female && (
       <img
        className="default-img"
        src={sprites.back_female}
        alt={`${name}-back_female`}
       />
      )}
      {sprites?.back_shiny && (
       <img
        className="default-img"
        src={sprites.back_shiny}
        alt={`${name}-back_shiny`}
       />
      )}
      {sprites?.back_shiny_female && (
       <img
        className="default-img"
        src={sprites.back_shiny_female}
        alt={`${name}-back_shiny_female`}
       />
      )}
      {sprites?.front_default && (
       <img
        className="default-img"
        src={sprites.front_default}
        alt={`${name}-front_default`}
       />
      )}
      {sprites?.front_female && (
       <img
        className="default-img"
        src={sprites.front_female}
        alt={`${name}-front_female`}
       />
      )}
      {sprites?.front_shiny && (
       <img
        className="default-img"
        src={sprites?.other?.['official-artwork']?.front_default}
        alt={`${name}-front_shiny`}
       />
      )}
     </div>

     <h3>Sprites</h3>
     <div className="stats-card">
      {stats?.map((statsObj, stIndex) => {
       const { stat, base_stat } = statsObj;
       return (
        <div key={stIndex} className="stat-item">
         <p>{stat?.name.replaceAll('-', ' ')}</p>
         <h4>{base_stat}</h4>
        </div>
       );
      })}
     </div>
     <h3>Moves</h3>
     <div className="pokemon-move-grid">
      {moves?.map((moveObj, index) => {
       return (
        <button
         className="button-card pokemon-move"
         key={index}
         onClick={() => {
          fetchMoreSkillData(moveObj?.move?.name, moveObj?.move?.url);
         }}
        >
         <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
        </button>
       );
      })}
     </div>
    </div>
   )}
  </div>
 );
}

export default PokeCard;
