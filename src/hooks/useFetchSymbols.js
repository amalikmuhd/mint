import { useState } from "react";
import axios from "axios";

/**
 * fetchSymbols
 *
 * It fetches symbol data using an HTTP GET request, updates the appropriate state variables
 * (loading, error, and data) based on the success or failure of the request,
 * And it has a callack function and it pass arg so that when another api call want to interact with it can use the arg inside new function
 * Any errors that occur are logged to the console.
 */

const useFetchSymbols = () => {
  /**
   * store values
   */
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * This fun make an api call
   */
  const request = async (callBack) => {
    setLoading(true);

    try {
      const response = await axios.get("/v1/symbols");
      if (response.status === 200) {
        setData(response.data);
        setError(false);
        /**
         * this callback takes the data gotten from the response data and pass it to the caller
         */
        callBack(response.data);
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
  return { data, loading, error, request };
};

export default useFetchSymbols;
