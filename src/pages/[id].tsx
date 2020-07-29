import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';

import { Loading, Pill, PokemonCard, Section } from '../components';
import {
  ButonBack,
  ContentWrapper,
  DetailItemTitle,
  DetailItemWrapper,
  DetailWrapper,
  HeaderWrapper,
  Image,
  ImageWrapper,
  LeftWrapper,
  Number,
  PillWrapper,
  PokemonItem,
  SubTitle,
  Text,
  Title,
  NumberLabel,
} from '../components/PokemonDetailComponent';
import getPokemonDetailQuery from '../graphql/pokemon.query';
import { theme } from '../themes';

const DetailItem: React.FC<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <DetailItemWrapper>
      <DetailItemTitle>{title}</DetailItemTitle>
      {children}
    </DetailItemWrapper>
  );
};

const PokemonDetailPage: React.FC = () => {
  const { query } = useRouter();
  const id = query?.id;
  const { data, loading } = useQuery(getPokemonDetailQuery, {
    variables: {
      name: id,
    },
  });
  if (loading && !data) {
    return (
      <Section>
        <Head>
          <title>Pokedex</title>
        </Head>
        <Loading />
      </Section>
    );
  }

  const pokemonDetail = data?.pokemon;

  const handleBack = () => Router.back();

  if (pokemonDetail && !loading) {
    const {
      name,
      number,
      image,
      classification,
      height,
      weight,
      attacks,
      weaknesses,
      resistant,
      maxCP,
      maxHP,
      fleeRate,
      evolutionRequirements,
      evolutions,
      types,
    } = pokemonDetail;
    return (
      <>
        <Head>
          <title>Pokedex | {name}</title>
        </Head>
        <Section>
          <HeaderWrapper>
            <ButonBack onClick={handleBack}>&lt; Back</ButonBack>
            <Title>
              {name} <Number>#{number}</Number>
            </Title>
          </HeaderWrapper>
          <ContentWrapper>
            <LeftWrapper>
              <ImageWrapper>
                <NumberLabel>#{number}</NumberLabel>
                <Image url={image} />
              </ImageWrapper>
              <DetailItem title="Evolution Requirement">
                {evolutionRequirements ? (
                  <>
                    <SubTitle>Name</SubTitle>
                    <Text>{evolutionRequirements?.name}</Text>
                    <SubTitle>Amount</SubTitle>
                    <Text>{evolutionRequirements?.amount}</Text>
                  </>
                ) : (
                  <Text>-</Text>
                )}
              </DetailItem>
              <DetailItem title="Evolutions">
                <PillWrapper>
                  {evolutions ? (
                    (evolutions || []).map((item) => {
                      return (
                        <Link
                          href="[id]"
                          as={item.name.toLowerCase()}
                          passHref
                          key={item.id}
                        >
                          <PokemonItem>
                            <PokemonCard
                              name={item.name}
                              number={item.number}
                              image={item.image}
                              types={item.types}
                            />
                          </PokemonItem>
                        </Link>
                      );
                    })
                  ) : (
                    <Text>-</Text>
                  )}
                </PillWrapper>
              </DetailItem>
            </LeftWrapper>
            <DetailWrapper>
              <DetailItem title="Clasification">
                <Text> {classification}</Text>
                <SubTitle>Max HP</SubTitle>
                <Text>{maxHP}</Text>
                <SubTitle>Max CP</SubTitle>
                <Text>{maxCP}</Text>
                <SubTitle>Flee Rate</SubTitle>
                <Text>{fleeRate}</Text>
              </DetailItem>
              <DetailItem title="Looks">
                <SubTitle>Height</SubTitle>
                <Text>Height Max: {height?.maximum}</Text>
                <Text>Height Max: {height?.minimum}</Text>
                <SubTitle>Weight</SubTitle>
                <Text>Weight Max: {weight?.maximum}</Text>
                <Text>Weight Max: {weight?.minimum}</Text>
              </DetailItem>
              <DetailItem title="Types">
                <PillWrapper>
                  {(types || []).map((item) => {
                    return <Pill key={item}>{item}</Pill>;
                  })}
                </PillWrapper>
              </DetailItem>
              <DetailItem title="Attack">
                <SubTitle>Fast</SubTitle>
                <PillWrapper>
                  {(attacks?.fast || []).map((item) => {
                    return (
                      <Pill key={item.name} background={theme.color.red}>
                        {item.name}
                      </Pill>
                    );
                  })}
                </PillWrapper>
                <SubTitle>Special</SubTitle>
                <PillWrapper>
                  {(attacks?.special || []).map((item) => {
                    return (
                      <Pill key={item.name} background={theme.color.red}>
                        {item.name}
                      </Pill>
                    );
                  })}
                </PillWrapper>
              </DetailItem>
              <DetailItem title="Resistant">
                <PillWrapper>
                  {(resistant || []).map((item) => {
                    return (
                      <Pill key={item} background={theme.color.blue}>
                        {item}
                      </Pill>
                    );
                  })}
                </PillWrapper>
              </DetailItem>
              <DetailItem title="Weakness">
                <PillWrapper>
                  {(weaknesses || []).map((item) => {
                    return (
                      <Pill key={item} background={theme.color.yellow}>
                        {item}
                      </Pill>
                    );
                  })}
                </PillWrapper>
              </DetailItem>
            </DetailWrapper>
          </ContentWrapper>
        </Section>
      </>
    );
  }

  return (
    <Section>
      {' '}
      <HeaderWrapper>
        <ButonBack onClick={handleBack}>&lt; Back</ButonBack>
        <Title>No Data Found</Title>
      </HeaderWrapper>
    </Section>
  );
};

export default PokemonDetailPage;
