/**
 *  Testing CandleChart component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CandleChart from "../components/CandleChart";

describe("CandleChart component", () => {
  const mockCandleData = [
    {
      data: [
        {
          x: new Date("2023-07-08"),
          y: [10000, 12000, 9000, 11000],
        },
        {
          x: new Date("2023-07-09"),
          y: [11000, 13000, 9500, 11500],
        },
      ],
    },
  ];

  it("Should show loading text when loading is true", () => {
    render(<CandleChart data={mockCandleData} error={false} loading={true} />);
    const loadingText = screen.getByText("loading");
    expect(loadingText).toBeInTheDocument();
  });

  it("Show show error text when candleError is true", () => {
    render(<CandleChart data={mockCandleData} error={true} loading={false} />);
    const errorText = screen.getByText("couldn't retrieve the data");
    expect(errorText).toBeInTheDocument();
  });
});
