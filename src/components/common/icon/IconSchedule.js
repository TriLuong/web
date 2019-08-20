import React from 'react';

const IconSchedule = props => {
  const { fill, className } = props;
  return (
    <svg
      width="14px"
      height="10px"
      viewBox="0 0 14 10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Designer-Dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="1-qualifiedLeads-designer"
          transform="translate(-419.000000, -32.000000)"
          fill={fill}
        >
          <g id="Group-36" transform="translate(0.000000, -8.000000)">
            <g id="nav-bar">
              <g id="Group-17" transform="translate(393.000000, 18.000000)">
                <g id="Group-15" transform="translate(0.000000, 11.000000)">
                  <g id="Group-25" transform="translate(21.000000, 0.000000)">
                    <path
                      d="M6.18315018,11.7268722 L17.8168498,11.7268722 C19.1501832,11.7268722 19.1501832,13.7356828 17.8168498,13.7356828 L6.18315018,13.7356828 C4.84981685,13.7356828 4.84981685,11.7268722 6.18315018,11.7268722 Z M6.18315018,15.3215859 L17.8168498,15.3215859 C19.1501832,15.3215859 19.1501832,17.2246696 17.8168498,17.2246696 L6.18315018,17.2246696 C4.84981685,17.2246696 4.84981685,15.3215859 6.18315018,15.3215859 Z M6.18315018,18.9162996 L17.8168498,18.9162996 C19.1501832,18.9162996 19.1501832,20.8193833 17.8168498,20.8193833 L6.18315018,20.8193833 C4.84981685,20.8193833 4.84981685,18.9162996 6.18315018,18.9162996 Z"
                      id="Combined-Shape"
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
IconSchedule.defaultProps = {
  className: '',
  fill: '#A5A7AA',
};

export default IconSchedule;
