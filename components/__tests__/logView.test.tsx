import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'tamagui';
import { LogView } from '../logView';

describe('LogView component', () => {
  it('renders children inside a scrollable layout', () => {
    const { getByText } = render(
      <LogView>
        <Text>Child content</Text>
      </LogView>,
    );

    expect(getByText('Child content')).toBeTruthy();
  });
});

