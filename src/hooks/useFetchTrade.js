import axios from "axios";
import { useState } from "react";

/**
 * fetchTrade
 *
 * It check if the symbol parameter is not falsy, but it is false it will log a message and return the from the function.
 *
 * However when the data is not empty, It fetches data given from the HTTP get request and, it also
 * updates these state variables data, error and loading based on
 * whether success or failure of the request, and It logs any errors to the console
 *
 */
const useFetchTrade = () => {
  /**
   * store values
   */
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (symbol) => {
    setLoading(true);
    /**
     * This block returns immediately when symbol is not pass
     */
    if (!symbol) {
      setError(true);
      setLoading(false);
      return console.log(symbol, "no symbol received");
    }

    try {
      const response = await axios.get(`/v1/trades/${symbol.toUpperCase()}`);
      setData(response.data);
      setError(false);
    } catch (error) {
      console.log(error, "error");
      setError(true);
    }
    setLoading(false);
  };
  /**
   *  returns these to the caller
   */
  return { data, loading, error, request };
};

export default useFetchTrade;
