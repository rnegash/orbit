import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import LogList from "../logList";
import { useSQLiteContext } from "expo-sqlite";

jest.mock("expo-sqlite");

const mockedUseSQLiteContext = useSQLiteContext as jest.Mock;

describe("LogList screen", () => {
  beforeEach(() => {
    mockedUseSQLiteContext.mockReset();
  });

  it("renders merged and sorted pain and workout events", async () => {
    mockedUseSQLiteContext.mockReturnValue({
      getAllAsync: jest
        .fn()
        .mockResolvedValueOnce([
          {
            id: 1,
            painLocation: "Knee",
            painLevel: 5,
            painType: "sharp",
            painTrigger: "Running",
            createdAt: "2024-01-01T12:00:00Z",
          },
        ])
        .mockResolvedValueOnce([
          {
            id: 2,
            workoutType: "gym",
            workoutIntensity: 7,
            workoutDuration: 60,
            workoutNotes: "Felt good",
            createdAt: "2024-01-02T12:00:00Z",
          },
        ]),
    });

    const { getAllByText } = render(<LogList />);

    await waitFor(() => {
      const titles = getAllByText(/ – /);

      expect(titles[0].props.children).toBe("Workout – gym");
      expect(titles[1].props.children).toBe("Pain – Knee");
    });
  });

  it("handles empty database without crashing", async () => {
    mockedUseSQLiteContext.mockReturnValue({
      getAllAsync: jest.fn().mockResolvedValueOnce([]),
    });

    const { queryByText } = render(<LogList />);

    await waitFor(() => {
      expect(queryByText(/No events found/)).toBeTruthy();
    });
  });
});
