// Reusable Loading Spinner Component
export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "400px" }}
    >
      <div className="text-center">
        <div className="spinner-border mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};
