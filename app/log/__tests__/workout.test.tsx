import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Workout from '../workout';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';

jest.mock('expo-sqlite');
jest.mock('expo-router');

const mockedUseSQLiteContext = useSQLiteContext as unknown as jest.Mock;
const mockedUseRouter = useRouter as unknown as jest.Mock;

describe('Workout screen', () => {
  beforeEach(() => {
    mockedUseSQLiteContext.mockReset();
    mockedUseRouter.mockReset();
  });

  it('shows validation message when all fields are empty', async () => {
    const prepareAsync = jest.fn().mockResolvedValue({
      executeAsync: jest.fn(),
      finalizeAsync: jest.fn(),
    });

    mockedUseSQLiteContext.mockReturnValue({
      prepareAsync,
    });

    const navigate = jest.fn();
    mockedUseRouter.mockReturnValue({ navigate });

    const { getByText } = render(<Workout />);

    fireEvent.press(getByText('Add log'));

    await waitFor(() => {
      expect(getByText('At least one field needs to be filled')).toBeTruthy();
    });
  });
});

