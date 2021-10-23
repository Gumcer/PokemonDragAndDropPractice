import React from "react";

const Pokemon = ({ reSort, index, pokemon, findEvolution, addToTeam }) => {
  const evolutioncheck = () => {
    if (pokemon.evolutions) {
      return (
        <div>
          <div className="evolution-label">Evolution(s)</div>
          <div className="evolution">
            {pokemon.evolutions.map((poke, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    findEvolution(poke.name);
                  }}
                >
                  {poke.name}
                </button>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div className="empty"></div>;
    }
  };

  return (
    <div
      className="pokemon-container"
      onClick={() => {
        addToTeam(pokemon);
      }}
    >
      <div className="name-number-image">
        <div className="image-container">
          <img
            className="pokemon-image"
            src={pokemon.image}
            alt={pokemon.name}
          />
        </div>
        <div className="name-number">
          <div className="label-button">
            <div>
              <u>Name</u>
            </div>
            <button
              className="pokemon-name"
              onClick={() => {
                reSort(index);
              }}
            >
              {pokemon.name}
            </button>
          </div>
          <div className="label-button">
            <div>
              <u>Number</u>
            </div>
            <div>{pokemon.number}</div>
          </div>
        </div>
      </div>
      {evolutioncheck()}
    </div>
  );
};

export default Pokemon;
