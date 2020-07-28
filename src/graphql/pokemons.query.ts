import { gql } from '@apollo/react-hooks';

import pokemonFragment from './pokemon.fragment';

const getPokemonListQuery = gql`
  query getPokemonList($first: Int!) {
    pokemons(first: $first) {
      ...PokemonFragment
    }
  }
  ${pokemonFragment}
`;

export default getPokemonListQuery;
