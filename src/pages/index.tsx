import { useQuery, useLazyQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  InputSearch,
  PokemonCard,
  Loading,
  Section,
  Select,
} from '../components';
import {
  CloseButton,
  FilterWrapper,
  HeaderWrapper,
  Label,
  PokemonItem,
  PokemonsWrapper,
  Title,
} from '../components/HomeComponent';
import getPokemonDetailQuery from '../graphql/pokemon.query';
import getPokemonListQuery from '../graphql/pokemons.query';
import getPokemonClasificationTypeQuery from '../graphql/pokemonType.query';

const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState(null);
  const [isFindResultSearch, setIsFindResultSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const { loading, error } = useQuery(getPokemonListQuery, {
    variables: {
      first: 20,
      page: 1,
      type: activeType,
    },
    onCompleted: (res) => {
      setPokemons(res?.pokemons);
    },
  });

  const { data: dataType } = useQuery(getPokemonClasificationTypeQuery);
  const optionDataType = [];
  (dataType?.pokemonClasificationType?.types || []).map((item) => {
    return optionDataType.push({
      value: item,
      label: item,
    });
  });

  const [loadPokemon, { loading: loadingPokemon }] = useLazyQuery(
    getPokemonDetailQuery,
    {
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
    }
  );

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

  const handleSelectFilter = useCallback((e) => {
    const { value } = e.target;
    console.log(value);
    setActiveType(value);
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
        {dataType && (
          <FilterWrapper>
            <Label>Filter By Pokemon Type</Label>
            <Select
              optionData={optionDataType || []}
              onChange={handleSelectFilter}
            />
          </FilterWrapper>
        )}
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
