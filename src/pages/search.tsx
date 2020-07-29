import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';

import { InputSearch, PokemonCard, Section, Loading } from '../components';
import {
  CloseButton,
  HeaderWrapper,
  Label,
  PokemonItem,
  PokemonsWrapper,
  Title,
} from '../components/HomeComponent';
import { ButonBack } from '../components/PokemonDetailComponent';
import getPokemonDetailQuery from '../graphql/pokemon.query';

const HomePage: React.FC = () => {
  const [resultSearch, setResultSearch] = useState(null);
  const handleBack = () => Router.back();

  const [loadPokemon, { loading: loadingPokemon, data }] = useLazyQuery(
    getPokemonDetailQuery,
    {
      variables: {
        name: '',
      },
      onCompleted: (res) => {
        if (res?.pokemon === null) {
          setResultSearch([]);
        } else {
          setResultSearch([res?.pokemon]);
        }
      },
    }
  );

  const pokemonData = data?.pokemon;

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const { value } = e.target.search;
      if (value === '') {
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
    setResultSearch(null);
  }, []);

  return (
    <>
      <Head>
        <title>Pokedex | Search</title>
      </Head>
      <Section>
        <HeaderWrapper>
          <Title>Pokemon Index</Title>
          <InputSearch
            placeholder="Search by name"
            onSubmit={handleSearch}
            autoFocus
          />
        </HeaderWrapper>
        <ButonBack onClick={handleBack}>&lt; Back</ButonBack>
        {resultSearch?.length === 0 && (
          <Label>
            Search Result Not Found{' '}
            <CloseButton onClick={handleCloseSearch}>close</CloseButton>
          </Label>
        )}
      </Section>
      <Section>
        {loadingPokemon && <Loading />}
        {!loadingPokemon && pokemonData && (
          <PokemonsWrapper>
            {([pokemonData] || []).map((item) => {
              const { name, number, image, types, id } = item;
              return (
                <Link
                  href="[id]"
                  as={name.toLowerCase()}
                  passHref
                  key={id + name + number}
                >
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
        )}
      </Section>
    </>
  );
};

export default HomePage;
