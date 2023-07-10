/**
 *  Testing Ticker component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Ticker from "../components/Ticker";

describe("Ticker component", () => {
  const mockTickerData = {
    volume: 10000,
    low: 9000,
    high: 11000,
    bid: 10050,
    ask: 10060,
    last_price: 10055,
    mid: 10055,
    timestamp: 1625684422,
  };

  it("Ticker component with ticker data", () => {
    render(
      <Ticker data={mockTickerData} error={false} loading={false} selectedData="BTCUSD" visible={true} setVisible={() => {}} />
    );

    const volumeText = screen.getByText("VOL: 10,000");
    expect(volumeText).toBeInTheDocument();

    const lowText = screen.getByText("Low: 9000.00");
    expect(lowText).toBeInTheDocument();

    const highText = screen.getByText("High: 11000.00");
    expect(highText).toBeInTheDocument();

    const bidText = screen.getByText("bid: 10050.00");
    expect(bidText).toBeInTheDocument();

    const askText = screen.getByText("ask: 10060.00");
    expect(askText).toBeInTheDocument();

    const lastPriceText = screen.getByText("last_price: 10055.0000");
    expect(lastPriceText).toBeInTheDocument();

    const midText = screen.getByText("mid: 10055.00");
    expect(midText).toBeInTheDocument();

    const timestampText = screen.getByText("timestamp: 1625684422");
    expect(timestampText).toBeInTheDocument();
  });

  it("Should show loading text when loading is true", () => {
    render(
      <Ticker data={mockTickerData} error={false} loading={true} selectedData="BTCUSD" visible={true} setVisible={() => {}} />
    );

    const loadingText = screen.getByText("Loading");
    expect(loadingText).toBeInTheDocument();
  });

  it("Should show error text when error is true", () => {
    render(
      <Ticker data={mockTickerData} error={true} loading={false} selectedData="BTCUSD" visible={true} setVisible={() => {}} />
    );

    const errorText = screen.getByText("Couldnt retrieve the data");
    expect(errorText).toBeInTheDocument();
  });
});
