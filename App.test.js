import React from 'react';
import App2 from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App2 />).toJSON();
  expect(rendered).toBeTruthy();
});
