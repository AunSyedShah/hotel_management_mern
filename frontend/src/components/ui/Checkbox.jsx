import PropTypes from 'prop-types';

export function Checkbox({ 
  label,
  name,
  checked = false,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'primary',
  ...props 
}) {
  const sizeClasses = {
    xs: 'checkbox-xs',
    sm: 'checkbox-sm',
    md: '',
    lg: 'checkbox-lg'
  };

  const variantClasses = {
    primary: 'checkbox-primary',
    secondary: 'checkbox-secondary',
    accent: 'checkbox-accent',
    success: 'checkbox-success',
    warning: 'checkbox-warning',
    info: 'checkbox-info',
    error: 'checkbox-error'
  };

  const checkboxClasses = [
    'checkbox',
    variantClasses[variant],
    sizeClasses[size],
    error && 'checkbox-error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={checkboxClasses}
          {...props}
        />
        {label && (
          <span className="label-text">
            {label}
          </span>
        )}
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'])
};
