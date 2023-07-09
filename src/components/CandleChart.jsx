import PropTypes from "prop-types";
import ApexChart from "react-apexcharts";

import "apexcharts/dist/apexcharts.css";

/**
 *
 * CandleChart
 *
 * This component is a take data from its parameter and displays it on the candlestick graph,
 *
 *
 *  @param {array} data the list of array
 */
const CandleChart = ({ data }) => {
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
      <div>
        <ApexChart options={options} series={data} type="candlestick" height={"450"} width={"100%"} />
      </div>
    </div>
  );
};

// param below are require, only enforced by react in dev mode
CandleChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CandleChart;
