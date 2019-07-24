import React from 'react';

const IconEdit = props => {
  const { fill, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="4"
      viewBox="0 0 18 4"
      className={className}
    >
      <path
        fill={fill}
        fillRule="nonzero"
        d="M9 3.273A1.636 1.636 0 1 1 9 0a1.636 1.636 0 0 1 0 3.273zm-7.364 0a1.636 1.636 0 1 1 0-3.273 1.636 1.636 0 0 1 0 3.273zm14.728 0a1.636 1.636 0 1 1 0-3.273 1.636 1.636 0 0 1 0 3.273z"
      />
    </svg>
  );
};
IconEdit.defaultProps = {
  className: '',
  fill: '#8891A5',
};
export default IconEdit;
