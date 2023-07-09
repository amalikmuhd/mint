/**
 *
 * Ticker
 *
 * A Ticker display data ticker data and also provided a clickable option to change pair token
 *
 */

import PropTypes from "prop-types";

const Ticker = ({ data, setVisible, visible }) => {
  return (
    <div>
      <button className="mt-6 mb-6" onClick={() => setVisible(!visible)}>
        <p>- Select a ticker -</p>
      </button>

      <div className="flex flex-row">
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
  );
};

//param below are require, only enforced by react in dev mode
Ticker.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Ticker;
