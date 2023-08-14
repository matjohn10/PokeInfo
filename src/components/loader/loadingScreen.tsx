import "./loadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img
        src="../../../loading.gif"
        alt="https://tenor.com/en-CA/view/pokemon-nintendo-gif-25538516"
        className="loading-gif"
      />
      <div className="empty"></div>
    </div>
  );
};

export default LoadingScreen;
