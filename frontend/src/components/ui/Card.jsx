import PropTypes from 'prop-types';

export function Card({ 
  children, 
  title,
  className = '',
  compact = false,
  shadow = true,
  bordered = false,
  ...props 
}) {
  const baseClasses = 'card bg-base-100';
  const shadowClass = shadow ? 'shadow-lg' : '';
  const borderClass = bordered ? 'border border-base-300' : '';
  const paddingClass = compact ? 'p-4' : 'p-6';

  const classes = [
    baseClasses,
    shadowClass,
    borderClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={`card-body ${paddingClass}`}>
        {title && (
          <h2 className="card-title text-xl font-semibold mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
  shadow: PropTypes.bool,
  bordered: PropTypes.bool
};
