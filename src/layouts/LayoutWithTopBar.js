import React from 'react';
import PropTypes from 'prop-types';

const LayoutWithTopBar = ({ className, children }) => <div className={className}>{children}</div>;

LayoutWithTopBar.defaultProps = { className: '' };
LayoutWithTopBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LayoutWithTopBar;
