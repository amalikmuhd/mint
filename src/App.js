/**
 * App
 *
 * This is the entry file for the application.
 */

// Import all the third party
import { useEffect, useState } from "react";

// Import all the our own components
import CandleChart from "./components/CandleChart";
import Ticker from "./components/Ticker";
import Trades from "./components/Trades";
import Dropdown from "./components/Dropdown";

// Import all the custom hooks
import useFetchTrade from "./hooks/useFetchTrade";
import useFetchTicker from "./hooks/useFetchTicker";
import useFetchCandles from "./hooks/useFetchCandles";
import useFetchSymbols from "./hooks/useFetchSymbols";

const App = () => {
  /**
   *  state for selected data and also state visibility of the dropdown modal
   */
  const [selectedData, setSelectedData] = useState("");
  const [visible, setVisible] = useState(false);

  /**
   *  api calls from the hooks
   */
  const { data: tickerData, error: tickerError, loading: tickerLoading, request: tickerRequest } = useFetchTicker();
  const { data: tradeData, error: tradeError, loading: tradeLoading, request: tradeRequest } = useFetchTrade();
  const { data: candleData, error: candleError, loading: candleLoading, request: candleRequest } = useFetchCandles();
  const { data: symbolData, error: symbolDataError, loading: symbolDataLoading, request: symbolDataRequest } = useFetchSymbols();

  /**
   *  the symbolDataRequest is independent that pass the data to the dependent functions (tickerRequest, candleRequest,tradeRequest,setSelectedData)
   */
  // call fetchSymbols fun
  useEffect(() => {
    symbolDataRequest((data) => {
      tickerRequest(data[0]);
      candleRequest(data[0]);
      tradeRequest(data[0]);
      setSelectedData(data[0]);
    });
    // eslint-disable-next-line
  }, []);

  /**
   * Select another ticker this func makes the update
   * @param {string} data it takes a string value of a symbol E.g BTCUSD
   */
  const onSelectChange = (data) => {
    setSelectedData(data);
    tickerRequest(data);
    tradeRequest(data);
    candleRequest(data);
  };

  return (
    /**
     * Div contains children
     */
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 h-full">
      <div className="h-full rounded-lg bg-gray-100">
        <CandleChart data={candleData} error={candleError} loading={candleLoading} />
      </div>
      <div className="h-full rounded-lg bg-gray-100">
        <Ticker
          data={tickerData}
          error={tickerError}
          loading={tickerLoading}
          selectedData={selectedData}
          visible={visible}
          setVisible={setVisible}
        />
        <Trades data={tradeData} error={tradeError} loading={tradeLoading} />
      </div>
      <Dropdown
        visible={visible}
        setVisible={setVisible}
        data={symbolData}
        loading={symbolDataLoading}
        onSelectChange={onSelectChange}
        error={symbolDataError}
      />
    </div>
  );
};

export default App;
