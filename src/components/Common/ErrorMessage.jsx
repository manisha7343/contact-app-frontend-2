// Reusable Error Message Component
export const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <i className="fa fa-exclamation-circle me-2"></i>
      {message}
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          onClick={onDismiss}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};
