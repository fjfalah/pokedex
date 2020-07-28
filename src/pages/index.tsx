import { useQuery, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { InputSearch, PokemonCard, Loading, Section } from '../components';
import getPokemonDetailQuery from '../graphql/pokemon.query';
import getPokemonListQuery from '../graphql/pokemons.query';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.color.green};
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.black};
`;

const CloseButton = styled.b`
  cursor: pointer;
  padding: 0 8px;
  font-size: 15px;
  background: ${(props) => props.theme.color.red};
  color: ${(props) => props.theme.color.white};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const PokemonsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PokemonItem = styled.a`
  text-decoration: none;
  color: unset;
`;

const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState(null);
  const [isFindResultSearch, setIsFindResultSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState(null);
  const { loading, error } = useQuery(getPokemonListQuery, {
    variables: {
      first: 20,
    },
    onCompleted: (res) => {
      setPokemons(res?.pokemons);
    },
  });

  const [
    loadPokemon,
    { called: calledPokemon, loading: loadingPokemon, data: dataPokemon },
  ] = useLazyQuery(getPokemonDetailQuery, {
    variables: {
      name: '',
    },
    onCompleted: (res) => {
      if (res?.pokemon === null) {
        setResultSearch([]);
        setIsFindResultSearch(false);
      } else {
        setResultSearch([res?.pokemon]);
        setIsFindResultSearch(true);
      }
    },
  });

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const { value } = e.target.search;

      if (value === '') {
        setIsFindResultSearch(false);
        setResultSearch(null);
      } else {
        loadPokemon({
          variables: { name: value },
        });
      }
    },
    [loadPokemon]
  );

  const handleCloseSearch = useCallback(() => {
    setIsFindResultSearch(false);
    setResultSearch(null);
  }, []);

  if (error) return <p>error</p>;
  return (
    <>
      <Section>
        <HeaderWrapper>
          <Title>Pokemon Index</Title>
          <InputSearch placeholder="Search by name" onSubmit={handleSearch} />
        </HeaderWrapper>
        {!isFindResultSearch && resultSearch?.length === 0 && (
          <Label>
            Search Result Not Found{' '}
            <CloseButton onClick={handleCloseSearch}>close</CloseButton>
          </Label>
        )}
        {isFindResultSearch && (
          <Label>
            Search Result Found{' '}
            <CloseButton onClick={handleCloseSearch}>close</CloseButton>
          </Label>
        )}
      </Section>
      <Section>
        {(loading || loadingPokemon) && <Loading />}
        <PokemonsWrapper>
          {(resultSearch || pokemons || []).map((item) => {
            const { name, number, image, types, id } = item;
            return (
              <Link href="[id]" as={name.toLowerCase()} passHref key={id}>
                <PokemonItem>
                  <PokemonCard
                    name={name}
                    number={number}
                    image={image}
                    types={types}
                  />
                </PokemonItem>
              </Link>
            );
          })}
        </PokemonsWrapper>
      </Section>
    </>
  );
};

export default HomePage;
