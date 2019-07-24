import React from 'react';

const IconCancel = props => {
  const { fill, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm1.763-12l3.78-3.78c.555-.555.612-1.405.127-1.89-.485-.485-1.336-.429-1.89.126L12 10.236l-3.78-3.78c-.555-.555-1.405-.611-1.89-.126-.485.486-.429 1.336.126 1.89l3.78 3.78-3.78 3.78c-.555.555-.611 1.405-.126 1.89.486.485 1.336.429 1.89-.126l3.78-3.78 3.78 3.78c.555.555 1.405.611 1.89.126.485-.485.429-1.336-.126-1.89L13.764 12z"
      />
    </svg>
  );
};
IconCancel.defaultProps = {
  className: '',
  fill: '#ff3b30',
};
export default IconCancel;
