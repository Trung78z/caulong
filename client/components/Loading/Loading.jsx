function LoadingPage() {
  return (
    <div
      className="spinner-border text-info"
      role="status"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <span className="visually-hidden">Loading</span>
    </div>
  );
}

export default LoadingPage;
