import axios from "axios";
import { useState } from "react";

/**
 *
 * useFetchCandles
 *
 * It check if the data parameter is not falsy, but it is false it will log a message
 *  and return the from the function. but the data is not empty It fetches ticker data given from the HTTP get request and, it also
 * updates these state variables data, error, and loading based on
 * whether success or failure of the request, and It logs any errors to the console
 *
 * Based on success the response data is then processed to create an array of objects in the olhd variable.
 * Each object has a data property containing an array of items.
 * Each item in the array represents a candlestick, with properties x representing the timestamp
 * (converted to a Date object) and y representing an array of open, low, high, and close values of the candlestick.
 *
 *
 * @returns {{data:Array<object>,error:boolean,loading:boolean,request:(string) => Promise}} {[request]} - api call
 */
const useFetchCandles = () => {
  /**
   * store values
   */
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (symbol) => {
    setLoading(true);
    /**
     * this block returns immediately when symbol is not pass
     */
    if (!symbol) {
      setError(true);
      setLoading(false);
      return console.log("candle symbol candle");
    }

    try {
      const response = await axios.get(`/v2/candles/trade:30m:t${symbol.toUpperCase()}/hist`);
      /**
       * extra protection
       */
      if (response.status === 200) {
        setError(false);
        /**
         * convert response data to candlestick data series
         */
        const olhd = [
          {
            data: response.data?.map((item) => ({
              x: new Date(item[0]),
              y: [item[1], item[2], item[3], item[4]],
            })),
          },
        ];

        setData(olhd);
      }
    } catch (error) {
      console.log(error, "error");
      setError(true);
    }
    setLoading(false);
  };
  /**
   *  returns these to the caller
   */
  return { data, error, loading, request };
};

export default useFetchCandles;
