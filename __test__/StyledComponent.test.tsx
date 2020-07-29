import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import { Button, PokemonCard } from '../src/components';
import { theme } from '../src/themes';

const mountWithTheme = (component: React.ReactNode) => {
  return mount(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Test - Styled Component', () => {
  it('Should Theme Provider Works with Checking Color', () => {
    const wrapper = mountWithTheme(<Button>test</Button>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('background', '#1b998b');
  });
  it('Should Has Pokemon Number', () => {
    const wrapper = mountWithTheme(
      <PokemonCard
        name="Pikachu"
        number="025"
        types={['Electric']}
        image="https://img.pokemondb.net/artwork/pikachu.jpg"
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text()).toBe('#025');
  });
});
