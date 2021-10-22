import React from "react";

const Pokemon = ({ reSort, index, pokemon, findEvolution }) => {
  console.log("pokemon", pokemon);

  const evolutioncheck = () => {
    if (pokemon.evolutions) {
      return pokemon.evolutions.map((poke) => {
        return (
          <button
            onClick={() => {
              findEvolution(poke.name);
            }}
          >
            {poke.name}
          </button>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          reSort(index);
        }}
      >
        {pokemon.name}
      </button>
      <p>{pokemon.name}</p>
      <div>{pokemon.number}</div>
      <img src={pokemon.image} alt={pokemon.name} />
      {evolutioncheck()}
    </div>
  );
};

export default Pokemon;
