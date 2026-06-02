// Reusable Password Input Component with toggle
import { useState } from "react";

export const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="input-group">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          className={`form-control ${error ? "is-invalid" : ""} ${className}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          <i className={`fa fa-${showPassword ? "eye-slash" : "eye"}`}></i>
        </button>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};
