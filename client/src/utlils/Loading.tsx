const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column p-2">
        <div
          className="spinner-border text-info"
          style={{ height: "10rem", width: "10rem" }}
          role="status"
        ></div>
      </div>
    </>
  );
};

export default Loading;
