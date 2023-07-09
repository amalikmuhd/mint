/**
 *
 * Trade
 *
 * A trade component is a component that takes in time, price and amount data.
 *
 */

import PropTypes from "prop-types";
import moment from "moment";

const Trades = ({ data }) => {
  return (
    <div className="overflow-scroll h-34">
      <h1 className="my-4">Trades </h1>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Time</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Price</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => {
            return (
              <tr className={`odd:bg-gray-50 ${item.type === "sell" ? "text-red-500" : "text-green-500"}`} key={item.tid}>
                <td className="whitespace-nowrap px-4 py-2 font-medium">{moment(item.timestamp).format("h:mm:ss")}</td>
                <td className="whitespace-nowrap px-4 py-2 ">{parseFloat(item.price).toLocaleString()}</td>
                <td className="whitespace-nowrap px-4 py-2">{parseFloat(item.amount).toFixed(4)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

//param below are require, only enforced by react in dev mode
Trades.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Trades;
