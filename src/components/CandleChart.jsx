import PropTypes from "prop-types";
import ApexChart from "react-apexcharts";

import "apexcharts/dist/apexcharts.css";

/**
 *
 * CandleChart.js
 *
 * This component is a take data from its parameter and displays it on the candlestick graph,
 *
 *  @param {array} data the list of array
 *  @param {boolean} error the error
 *  @param {bloean} loading loading the incoming data
 */
const CandleChart = ({ data, error, loading }) => {
  /**
   *These options are typically used in conjunction with a charting library to create a candlestick chart.
   *They customize the appearance and behavior of the chart accordingly.
   */
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>couldn't retrieve the data</p>
      ) : (
        <div>
          <ApexChart options={options} series={data} type="candlestick" height={"450"} width={"100%"} />
        </div>
      )}
    </div>
  );
};

// All params below are require, only enforced by react in dev mode
CandleChart.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CandleChart;
