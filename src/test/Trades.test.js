/**
 *  Testing Trades component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Trades from "../components/Trades";

describe("Trades component", () => {
  const mockTradeData = [
    { tid: 1, timestamp: 1625684422, price: 10000, amount: 0.5, type: "buy" },
    { tid: 2, timestamp: 1625684423, price: 11000, amount: 0.8, type: "sell" },
  ];

  it("Should show loading text when loading is true", () => {
    render(<Trades data={mockTradeData} error={false} loading={true} />);
    const trades = screen.getByText("Trades");
    expect(trades).toBeInTheDocument();

    const loadingText = screen.getByText("loading");
    expect(loadingText).toBeInTheDocument();
  });

  it("Should show error text when error is true", () => {
    render(<Trades data={mockTradeData} error={true} loading={false} />);

    const trades = screen.getByText("Trades");
    expect(trades).toBeInTheDocument();

    const errorText = screen.getByText("couldn't retrieve the data");
    expect(errorText).toBeInTheDocument();
  });
});
