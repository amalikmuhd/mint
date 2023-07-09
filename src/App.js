import { useState } from "react";

import CandleChart from "./components/CandleChart";
import Dropdown from "./components/Dropdown";
import Ticker from "./components/Ticker";
import Trades from "./components/Trades";

/**
 * Data for ticker
 */
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

/**
 * Data for trade
 */
const mockTradeData = [
  { tid: 1, timestamp: 1625684422, price: 10000, amount: 0.5, type: "buy" },
  { tid: 2, timestamp: 1625684423, price: 11000, amount: 0.8, type: "sell" },
];

/**
 * Data for candle
 */
const mockCandleData = [
  {
    /**
     * candle  data
     */
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

function App() {
  /**
   * This block manage the visibility of dropdown modal
   */
  const [visible, setVisible] = useState(false);

  return (
    /**
     *  Div that contains children
     *
     */
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 h-full">
      <div className="h-full rounded-lg bg-gray-100">
        <CandleChart data={mockCandleData} />
      </div>
      <div className="h-full rounded-lg bg-gray-100">
        <Ticker data={mockTickerData} visible={visible} setVisible={setVisible} />
        <Trades data={mockTradeData} />
      </div>

      <Dropdown visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default App;
