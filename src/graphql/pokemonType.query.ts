import { gql } from '@apollo/react-hooks';

const getPokemonClasificationTypeQuery = gql`
  query getPokemonClasificationType {
    pokemonClasificationType {
      types
    }
  }
`;

export default getPokemonClasificationTypeQuery;
