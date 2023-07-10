/**
 *
 * Ticker.js
 *
 * A Ticker display data ticker data and also provided a clickable option to change pair token
 *
 */

import PropTypes from "prop-types";

const Ticker = ({ data, error, loading, selectedData, visible, setVisible }) => {
  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Couldnt retrieve the data</p>
      ) : (
        <div>
          <button onClick={() => setVisible(!visible)} className="mt-8 mb-8">
            -- {selectedData ? selectedData.toUpperCase() : "Select Token Pair"} --
          </button>

          <div className="lg:flex sm:-flex-col gap-4">
            <h2>VOL: {parseFloat(data.volume).toLocaleString()}</h2>
            <h2>Low: {parseFloat(data.low).toFixed(2)}</h2>
            <h2>High: {parseFloat(data.high).toFixed(2)}</h2>
            <h2>bid: {parseFloat(data.bid).toFixed(2)}</h2>
            <h2>ask: {parseFloat(data.ask).toFixed(2)}</h2>
            <h2>last_price: {parseFloat(data.last_price).toFixed(4)}</h2>
            <h2>mid: {parseFloat(data.mid).toFixed(2)}</h2>
            <h2>timestamp: {data.timestamp}</h2>
          </div>
        </div>
      )}
    </>
  );
};

// All params below are require, only enforced by react in dev mode
Ticker.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedData: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Ticker;
