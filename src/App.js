import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Pokemon from "./Pokemon.js";

const QUERY = gql`
  query {
    pokemons(first: 100) {
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

  const renderPokemon = () => {
    if (pokemons.length > 0) {
      console.log("render ", pokemons);
      return pokemons.map((pokemon, index) => {
        return (
          <Pokemon
            reSort={reSort}
            index={index}
            key={index}
            pokemon={pokemon}
            findEvolution={findEvolution}
          />
        );
      });
    } else {
      setPokemons(sort(data.pokemons));
      return "Loading";
    }
  };

  return <div>{renderPokemon()}</div>;
}

export default App;
