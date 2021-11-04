import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <p className="loader__text">Loading...</p>
      <i className="fas fa-spinner loader__spinner"></i>
    </div>
  );
};

export default Loader;
