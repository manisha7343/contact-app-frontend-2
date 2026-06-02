// Reusable Submit Button Component
export const SubmitButton = ({
  label = "Submit",
  loading = false,
  disabled = false,
  className = "",
  type = "primary",
}) => {
  const buttonClass = `btn btn-${type} w-100 ${className}`;

  return (
    <button
      type="submit"
      className={buttonClass}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
};
