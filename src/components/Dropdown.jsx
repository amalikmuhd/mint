/**
 *
 * Dropdown
 *
 * It displays an array of data and also takes in additional params
 *
 *  @param {boolean} visible loading the incoming data
 *  @param {function} setVisible It is a function helps to close and open this modal
 */

import PropTypes from "prop-types";

const Dropdown = ({ setVisible, visible }) => {
  if (visible === false) return null;

  return (
    <div className="dropdownContainer" onClick={() => setVisible(false)}>
      <button>close modal</button>
      <div className="dropdownInnerContainer">
        <p className="text-black-700 mb-0 cursor-pointer">
          {/* pass a data here */}
          data
        </p>
      </div>
    </div>
  );
};

// All params below are require, only enforced by react in dev mode
Dropdown.propTypes = {
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Dropdown;
