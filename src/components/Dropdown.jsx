/**
 *
 * Dropdown.js
 *
 * It displays an array of data and also takes in additional params
 *
 *  @param {array} data the list of array
 *  @param {boolean} error failure or success of the data
 *  @param {boolean} candleError the error
 *  @param {boolean} visible loading the incoming data
 *  @param {function} setVisible It is a function helps to close and open this modal
 *  @param {function} onSelectChange It pass back the data that is selected inside this component
 */

import PropTypes from "prop-types";

import Loader from "./Loader";

const Dropdown = ({ setVisible, data, error, loading, onSelectChange, visible }) => {
  if (visible === false) return null;

  return (
    <div className="dropdownContainer" onClick={() => setVisible(false)}>
      <button>close modal</button>
      <div className="dropdownInnerContainer">
        {loading ? (
          <Loader />
        ) : error ? (
          <>couldn't retrieve data</>
        ) : (
          data?.map((ticker, index) => (
            <div
              className="cursor-pointer"
              key={index}
              value={ticker}
              onClick={() => {
                onSelectChange(ticker);
              }}
            >
              <p className="text-black-700 mb-0 cursor-pointer">{ticker.toUpperCase()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// All params below are require, only enforced by react in dev mode
Dropdown.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Dropdown;
