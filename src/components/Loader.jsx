/**
 *
 * Loader.js
 *
 * A loader, it shows a loading spinner
 *
 */

const Loader = () => {
  return (
    <div className="loaderContainer" data-testid="loader">
      <div className="lds-ring" data-testid="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
