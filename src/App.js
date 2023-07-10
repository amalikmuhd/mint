import { useEffect, useState } from "react";
import axios from "axios";

import CandleChart from "./components/CandleChart";
import Ticker from "./components/Ticker";
import Trades from "./components/Trades";
import Dropdown from "./components/Dropdown";

const App = () => {
  /**
   * Symbol data states
   */
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Ticker data states
   */
  const [tickerData, setTickerData] = useState([]);
  const [tickerError, setTickerError] = useState(false);
  const [tickerLoading, setTickerLoading] = useState(false);

  /**
   * trade data states
   */
  const [tradeData, setTradeData] = useState([]);
  const [tradeError, setTradeError] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);

  /**
   * candle data states
   */
  const [candleData, setCandleData] = useState([]);
  const [candleError, setCandleError] = useState(false);
  const [candleLoading, setCandleLoading] = useState(false);

  const [selectedData, setSelectedData] = useState("");
  const [visible, setVisible] = useState(false);

  /**
   *  fetchSymbols
   *
   * It fetches symbol data using an HTTP GET request, updates the appropriate state variables
   * (loading, error, and data) based on the success or failure of the request,
   * and calls three functions to fetch additional data related to the first symbol in the response data.
   * Any errors that occur are logged to the console.
   */
  const fetchSymbols = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/v1/symbols");
      setError(false);
      setData(response.data);
      fetchTicker(response.data[0]);
      fetchCandles(response.data[0]);
      fetchTrade(response.data[0]);
      setSelectedData(response.data[0]);
    } catch (error) {
      console.log(error, "error");
      setError(true);
    }
    setLoading(false);
  };

  /**
   * fetchTicker
   *
   * It check if the data parameter is not falsy, but it is false it will log a message
   *  and return the from the function. but the data is not empty
   *  It fetches ticker data given from the HTTP get request and, it also
   * updates these state variables tickerloading, tickerError and tickerData based on
   * whether success or failure of the request, and It logs any errors to the console
   *
   * @param {string} data it takes a string value of a symbol E.g BTCUSD
   */
  const fetchTicker = async (data) => {
    setTickerLoading(true);
    if (!data) {
      setTickerError(true);
      setTickerLoading(false);
      return console.log("no data");
    }

    try {
      const response = await axios.get(`/v1/pubticker/${data.toUpperCase()}`);
      setTickerError(false);
      setTickerData(response.data);
    } catch (error) {
      console.log(error, "error");
      setTickerError(true);
    }
    setTickerLoading(false);
  };

  /**
   * fetchCandles
   *
   * It check if the data parameter is not falsy, but it is false it will log a message
   *  and return the from the function. but the data is not empty It fetches ticker data given from the HTTP get request and, it also
   * updates these state variables candleoading, candleError and candleData based on
   * whether success or failure of the request, and It logs any errors to the console
   *
   * Based on success the response data is then processed to create an array of objects in the olhd variable.
   * Each object has a data property containing an array of items.
   * Each item in the array represents a candlestick, with properties x representing the timestamp
   * (converted to a Date object) and y representing an array of open, low, high, and close values of the candlestick.
   *
   *
   * @param {string} data it takes a string value of a symbol E.g BTCUSD
   */
  const fetchCandles = async (data) => {
    setCandleLoading(true);
    if (!data) {
      setCandleError(true);
      setCandleLoading(false);
      return console.log("candle input candle");
    }

    try {
      const response = await axios.get(`/v2/candles/trade:30m:t${data.toUpperCase()}/hist`);
      setCandleError(false);

      const olhd = [
        {
          data: response.data?.map((item) => ({
            x: new Date(item[0]),
            y: [item[1], item[2], item[3], item[4]],
          })),
        },
      ];

      setCandleData(olhd);
    } catch (error) {
      console.log(error, "error");
      setCandleError(true);
    }
    setCandleLoading(false);
  };

  /**
   * fetchTrade
   *
   * It check if the data parameter is not falsy, but it is false it will log a message
   *  and return the from the function. but the data is not empty
   *  It fetches ticker data given from the HTTP get request and, it also
   * updates these state variables tradeLoading, tradeError and tradeData based on
   * whether success or failure of the request, and It logs any errors to the console
   *
   * @param {string} data it takes a string value of a symbol E.g BTCUSD
   */
  const fetchTrade = async (data) => {
    setTradeLoading(true);
    if (!data) {
      setTradeLoading(false);
      setTradeError(true);
      return console.log("no input received");
    }
    try {
      const response = await axios.get(`/v1/trades/${data}`);
      setTradeError(false);
      setTradeData(response.data);
    } catch (error) {
      console.log(error, "error");
      setTradeError(true);
    }
    setTradeLoading(false);
  };

  // call fetchSymbols fun
  useEffect(() => {
    fetchSymbols();
  }, []);

  /**
   *
   * @param {string} data it takes a string value of a symbol E.g BTCUSD
   */
  const onSelectChange = (data) => {
    setSelectedData(data);
    fetchTicker(data);
    fetchTrade(data);
    fetchCandles(data);
  };

  return (
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
        data={data}
        loading={loading}
        onSelectChange={onSelectChange}
        error={error}
      />
    </div>
  );
};

export default App;
