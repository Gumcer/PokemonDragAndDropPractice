import React from "react";

const Pokemon = ({ reSort, index, pokemon, findEvolution }) => {
  console.log("pokemon", pokemon);

  const evolutioncheck = () => {
    if (pokemon.evolutions) {
      return (
        <div className="evolution-container">
          <div>Evolution(s)</div>
          {pokemon.evolutions.map((poke) => {
            return (
              <button
                onClick={() => {
                  findEvolution(poke.name);
                }}
              >
                {poke.name}
              </button>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="pokemon">
      <button
        onClick={() => {
          reSort(index);
        }}
      >
        {pokemon.name}
      </button>
      <p>{pokemon.name}</p>
      <div>{pokemon.number}</div>
      <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
      {evolutioncheck()}
    </div>
  );
};

export default Pokemon;
