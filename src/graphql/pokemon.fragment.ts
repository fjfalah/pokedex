import { gql } from '@apollo/react-hooks';

const pokemonFragment = gql`
  fragment PokemonFragment on Pokemon {
    id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    resistant
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    weaknesses
    fleeRate
    maxCP
    evolutions {
      id
      number
      name
      image
      types
    }
    evolutionRequirements {
      amount
      name
    }
    image
    maxHP
  }
`;

export default pokemonFragment;
