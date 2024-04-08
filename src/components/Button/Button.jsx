import React from 'react';
import './button.scss';

const Button = ({
  children,
  type,
  buttonType = 'button',
  onClick,
  disabled = false,
}) => {
  let styles = 'custom-btn';

  switch (type) {
    case 'teal':
      styles += ' teal';
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={styles}
      title="button"
      disabled={disabled}
    >
      <span title="buttonSpan">{children}</span> <i />
    </button>
  );
};
export default Button;
