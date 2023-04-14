import "./render-pokemon.styles.css";

const POKE_TYPE_COLOR = {
  normal: { background: "gray", color: "#1d1d1f" },
  fire: { background: "red", color: "#fff" },
  water: { background: "blue", color: "#fff" },
  grass: { background: "green", color: "#fff" },
  electric: { background: "yellow", color: "#1d1d1f" },
  ice: { background: "cyan", color: "#1d1d1f" },
  fighting: { background: "orange", color: "#1d1d1f" },
  poison: { background: "#800080", color: "#fff" },
  ground: { background: "brown", color: "#fff" },
  flying: { background: "skyblue", color: "#1d1d1f" },
  psychic: { background: "magenta", color: "#1d1d1f" },
  bug: { background: "chartreuse", color: "#fff" },
  rock: { background: "#FFF8DC", color: "#1d1d1f" },
  ghost: { background: "#E6E6FA", color: "#1d1d1f" },
  dragon: { background: "indigo", color: "#fff" },
  dark: { background: "black", color: "#fff" },
  steel: { background: "silver", color: "#1d1d1f" },
  fairy: { background: "pink", color: "#1d1d1f" },
};

const RenderPokemon = ({ pokemonData }) => {
  return pokemonData.map((pokemon, i) => (
    <div className="render-pokemon-wrapper" key={i}>
      <img
        className="render-pokemon-img"
        src={pokemon.sprites?.other['official-artwork']?.front_default}
      />
      <span className="render-pokemon-id">#{pokemon.id} </span>
      <span className="render-pokemon-name">{pokemon?.name}</span>
      <div>
        {pokemon?.types?.map((type, i) => (
          <span
            key={i}
            className="render-pokemon-type"
            style={POKE_TYPE_COLOR[type?.type?.name] || { background: "black" }}
          >
            {type?.type?.name}{" "}
          </span>
        ))}
      </div>
    </div>
  ));
};

export default RenderPokemon;
