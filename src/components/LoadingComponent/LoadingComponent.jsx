import ReactLoading from "react-loading";

function LoadingComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="green" />
    </div>
  );
}

export default LoadingComponent;
