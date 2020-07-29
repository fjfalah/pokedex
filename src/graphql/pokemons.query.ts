import { gql } from '@apollo/react-hooks';

import pokemonFragment from './pokemon.fragment';

const getPokemonListQuery = gql`
  query getPokemonList($first: Int!, $page: Int!, $type: String) {
    pokemons(first: $first, page: $page, type: $type) {
      ...PokemonFragment
    }
  }
  ${pokemonFragment}
`;

export default getPokemonListQuery;
