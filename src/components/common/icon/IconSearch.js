import React from 'react';

const IconSearch = props => {
  const { fill, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill={fill}
        fillRule="nonzero"
        d="M12.7 11.23a6.777 6.777 0 0 0 1.4-4.174C14.1 3.18 11 0 7.1 0S0 3.18 0 7.056s3.2 7.056 7.1 7.056c1.6 0 3.1-.497 4.2-1.392l3 2.982c.2.199.5.298.7.298.2 0 .5-.1.7-.298.4-.398.4-.994 0-1.391l-3-3.081zm-5.6.795c-2.8 0-5.1-2.186-5.1-4.97 0-2.782 2.3-5.067 5.1-5.067s5.1 2.285 5.1 5.068c0 2.783-2.3 4.969-5.1 4.969z"
      />
    </svg>
  );
};
IconSearch.defaultProps = {
  className: '',
  fill: '#8891A5',
};
export default IconSearch;
