import React from 'react';

const IconCheck = props => {
  const { fill, className } = props;
  return (
    <svg
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Designer-Dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="1-qualifiedLeads-designer"
          transform="translate(-927.000000, -23.000000)"
          fill={fill}
        >
          <g id="Group-36" transform="translate(0.000000, -1.000000)">
            <g id="nav-bar">
              <g id="Group-17" transform="translate(393.000000, 11.000000)">
                <g id="Group-15-Copy-2" transform="translate(513.000000, 11.000000)">
                  <g id="Group-25" transform="translate(21.000000, 0.000000)">
                    <path
                      d="M7.00190461,12.8204851 L2.79356193,8.61276391 L4.64821757,6.75856665 L7.00190461,9.11053499 L11.9999917,4.10793566 C9.77960298,1.83428772 6.30683541,1.34319915 3.5437062,2.91212135 C0.780576993,4.48104355 -0.579028633,7.71598411 0.233028742,10.7892915 C1.04508612,13.8625988 3.82488023,16.0024949 7.00190461,15.9999978 C11.9984371,15.9999978 15.3455231,10.9196218 13.4737667,6.35568318 L7.00190461,12.8204851 Z"
                      id="Path"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
IconCheck.defaultProps = {
  className: '',
  fill: '#A5A7AA',
};

export default IconCheck;
