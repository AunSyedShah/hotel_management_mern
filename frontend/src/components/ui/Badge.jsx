import PropTypes from 'prop-types';

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  outline = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'badge';
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    neutral: 'badge-neutral',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    ghost: 'badge-ghost'
  };
  
  const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    outline && 'badge-outline',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error', 'ghost']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  outline: PropTypes.bool,
  className: PropTypes.string
};
