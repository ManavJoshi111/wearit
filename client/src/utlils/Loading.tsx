const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column p-2 w-100 h-100">
        <div
          className="spinner-border text-info"
          style={{ height: "5rem", width: "5rem" }}
          role="status"
        ></div>
      </div>
    </>
  );
};

export default Loading;
