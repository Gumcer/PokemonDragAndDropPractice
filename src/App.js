import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Pokemon from "./Pokemon.js";

const QUERY = gql`
  query {
    pokemons(first: 151) {
      id
      name
      number
      image
      evolutions {
        name
      }
    }
  }
`;

function App() {
  const { data, loading } = useQuery(QUERY);
  const [pokemons, setPokemons] = useState([]);
  const [team, setTeam] = useState([]);
  if (loading) return <div>...</div>;

  const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base"
  });

  const reSort = (index) => {
    var newPokemons = [...pokemons];
    for (var i = 0; i < index; i++) {
      newPokemons.push(newPokemons.shift());
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setPokemons(newPokemons);
  };

  const findEvolution = (pokemonName) => {
    var index = pokemons
      .map((evo) => {
        return evo.name;
      })
      .indexOf(pokemonName);
    reSort(index);
  };

  const sort = (pokemons) => {
    return pokemons.sort((a, b) => {
      return collator.compare(a.name, b.name);
    });
  };

  const addToTeam = (pokemon) => {
    setTeam((prevTeam) => [...prevTeam, pokemon]);
  };

  const renderPokemon = () => {
    if (pokemons.length > 0) {
      return pokemons.map((pokemon, index) => {
        return (
          <Pokemon
            reSort={reSort}
            index={index}
            key={index}
            pokemon={pokemon}
            findEvolution={findEvolution}
            addToTeam={addToTeam}
          />
        );
      });
    } else {
      setPokemons(sort(data.pokemons));
      return "Loading";
    }
  };

  const renderTeam = () => {
    if (team.length > 0) {
      return team.map((pokemon, index) => {
        return (
          <Pokemon
            reSort={reSort}
            index={index}
            key={index}
            pokemon={pokemon}
            findEvolution={findEvolution}
            addToTeam={addToTeam}
          />
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className="main-container">
      <div className="pokemon-list-container">{renderPokemon()}</div>
      <div className="team-list-container">
        <div>My Team</div>
        {renderTeam()}
      </div>
    </div>
  );
}

export default App;
