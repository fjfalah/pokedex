import { gql } from '@apollo/react-hooks';

import pokemonFragment from './pokemon.fragment';

const getPokemonDetailQuery = gql`
  query getPokemonDetail($name: String, $id: String) {
    pokemon(name: $name, id: $id) {
      ...PokemonFragment
    }
  }
  ${pokemonFragment}
`;

export default getPokemonDetailQuery;
