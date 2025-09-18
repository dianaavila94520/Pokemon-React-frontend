import { useState, useRef } from 'react';
import Modal from './Modal';
import TypeCard from './TypeCard';
import scaleValue from '../utils/scaleValue';
import { skillCachePokemon } from '../cache/allCaches';
function PokeCard(props) {
 const { name, stats, types, moves, sprites } = props?.dataPokemonObj || {};

 const [skill, setSkill] = useState(null);
 const [loadingSkill, setloadingSkill] = useState(false);
 const docRef = useRef(null);
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
 const maxVal = 5;
 function handleDefPokeImgHover(ev) {
  if (!docRef) return;

  const mousePos = ev.clientX;
  const imgPosLeft = ev.currentTarget.getBoundingClientRect().left;
  const iconWidth = ev.currentTarget.getBoundingClientRect().width;
  const cursorDist = ((mousePos - imgPosLeft) / iconWidth) * 100;
  const offsetPix = scaleValue(cursorDist, [0, 1], [maxVal * -1, maxVal]);
  docRef.current.style.setProperty('--default-img-left', `${offsetPix * -1}px`);
  docRef.current.style.setProperty('--default-img-right', `${offsetPix}px`);
  console.table(offsetPix, cursorDist * 100);
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
     <div className="main-img-container">
      {sprites && (
       <img
        className="main-default-img"
        src={sprites?.other?.['official-artwork']?.front_default}
        alt={`${name}-front_default-image`}
       />
      )}
     </div>
     <div className="img-container">
      <ul ref={docRef}>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.front_shiny_female ? 'default-img' : null}
       >
        <div>
         {sprites?.front_shiny_female && (
          <>
           <img
            src={sprites.front_shiny_female}
            alt={`${name}-front_shiny_female`}
           />
           {/* <i class="fa-solid fa-download"></i> */}
          </>
         )}
        </div>
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.back_default ? 'default-img' : null}
       >
        {sprites?.back_default && (
         <img src={sprites.back_default} alt={`${name}-back_default`} />
        )}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.back_female ? 'default-img' : null}
       >
        {' '}
        {sprites?.back_female && (
         <img src={sprites.back_female} alt={`${name}-back_female`} />
        )}{' '}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.back_shiny ? 'default-img' : null}
       >
        {' '}
        {sprites?.back_shiny && (
         <img src={sprites.back_shiny} alt={`${name}-back_shiny`} />
        )}{' '}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.back_shiny_female ? 'default-img' : null}
       >
        {' '}
        {sprites?.back_shiny_female && (
         <img
          src={sprites.back_shiny_female}
          alt={`${name}-back_shiny_female`}
         />
        )}{' '}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.front_default ? 'default-img' : null}
       >
        {' '}
        {sprites?.front_default && (
         <img src={sprites.front_default} alt={`${name}-front_default`} />
        )}{' '}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.front_female ? 'default-img' : null}
       >
        {' '}
        {sprites?.front_female && (
         <img src={sprites.front_female} alt={`${name}-front_female`} />
        )}{' '}
       </li>
       <li
        onMouseMove={handleDefPokeImgHover}
        className={sprites?.front_shiny ? 'default-img' : null}
       >
        {' '}
        {sprites?.front_shiny && (
         <img
          src={sprites?.other?.['official-artwork']?.front_default}
          alt={`${name}-front_shiny`}
         />
        )}{' '}
       </li>
      </ul>
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
