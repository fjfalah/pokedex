import { gql } from '@apollo/react-hooks';

import pokemonFragment from './pokemon.fragment';

const getPokemonListQuery = gql`
  query getPokemonList($first: Int!, $page: Int!) {
    pokemons(first: $first, page: $page) {
      ...PokemonFragment
    }
  }
  ${pokemonFragment}
`;

export default getPokemonListQuery;
