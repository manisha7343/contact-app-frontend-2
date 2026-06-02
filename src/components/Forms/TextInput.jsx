// Reusable Text Input Component
export const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};
