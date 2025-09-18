import { pokemonTypeColors } from './../utils/index';

function TypeCard(props) {
 const { mytype } = props;

 const style = {
  color: pokemonTypeColors?.[mytype?.name]?.color,
  background: pokemonTypeColors?.[mytype?.name]?.background,
 };
 return (
  <div className="type-tile" style={style}>
   <p>{mytype?.name}</p>
  </div>
 );
}

export default TypeCard;
