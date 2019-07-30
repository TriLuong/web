import React from 'react';
import PropTypes from 'prop-types';

const LayoutBlank = ({ className, children }) => (
  <div className={className} style={{ position: 'relative', minHeight: '100vh' }}>
    {children}
  </div>
);

LayoutBlank.defaultProps = { className: '' };
LayoutBlank.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LayoutBlank;
