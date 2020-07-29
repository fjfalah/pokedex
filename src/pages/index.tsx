import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

import {
  InputSearch,
  PokemonCard,
  Loading,
  Section,
  Select,
  InfiniteScroll,
} from '../components';
import {
  FilterWrapper,
  HeaderWrapper,
  Label,
  PokemonItem,
  PokemonsWrapper,
  Title,
} from '../components/HomeComponent';
import getPokemonListQuery from '../graphql/pokemons.query';
import getPokemonClasificationTypeQuery from '../graphql/pokemonType.query';

const HomePage: React.FC = () => {
  const perPage = 20;
  const [activeType, setActiveType] = useState(null);
  const [hasMoreDataLoad, setHasMoreDataLoad] = useState(true);
  const { loading, fetchMore, data } = useQuery(getPokemonListQuery, {
    variables: {
      first: perPage,
      page: 1,
      type: activeType,
    },
  });

  const pokemonData = data?.pokemons || [];
  const latestPage = Math.ceil(pokemonData.length / perPage);

  const { data: dataType } = useQuery(getPokemonClasificationTypeQuery);
  const optionDataType = [];
  (dataType?.pokemonClasificationType?.types || []).map((item) => {
    return optionDataType.push({
      value: item,
      label: item,
    });
  });

  const handleSelectFilter = useCallback((e) => {
    const { value } = e.target;
    setHasMoreDataLoad(true);
    setActiveType(value);
  }, []);

  const handleLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        page: latestPage + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const { length } = fetchMoreResult.pokemons;
        if (length === 0) {
          setHasMoreDataLoad(false);
          return prev;
        }
        setHasMoreDataLoad(true);
        const updatedData = {
          ...prev,
          pokemons: [...prev.pokemons, ...fetchMoreResult.pokemons],
        };
        return updatedData;
      },
    });
  }, [fetchMore, latestPage]);

  return (
    <>
      <Head>
        <title>Pokedex | Home</title>
      </Head>
      <Section>
        <HeaderWrapper>
          <Title>Pokemon Index</Title>
          <Link href="/search" passHref>
            <InputSearch
              placeholder="Search by name"
              onSubmit={() => null}
              readOnly
            />
          </Link>
        </HeaderWrapper>
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
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMoreDataLoad}
          loader={<Loading />}
        >
          {!loading && (
            <PokemonsWrapper>
              {(pokemonData || []).map((item) => {
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
        </InfiniteScroll>
      </Section>
    </>
  );
};

export default HomePage;
