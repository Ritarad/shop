import React from 'react';
import './button.scss';

const Button = ({ children, type, onClick }) => {
  let styles = 'custom-btn';

  switch (type) {
    case 'teal':
      styles += ' teal';
      break;
    default:
      break;
  }

  return (
    <button onClick={onClick} className={styles}>
      <span>{children}</span> <i />
    </button>
  );
};

export default Button;
