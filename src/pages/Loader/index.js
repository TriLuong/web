// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { makeGetLoading } from './selectors';
import reducer from './reducer';
import './styles.scss';

type Props = {
  isLoading: Boolean,
};
class Loader extends React.PureComponent<Props> {
  render() {
    const { isLoading } = this.props;
    if (!isLoading) {
      return null;
    }
    return (
      <div className="container-loading">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isLoading: makeGetLoading() || false,
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'loaderReducer', reducer });
export default compose(
  withReducer,
  withConnect,
)(Loader);
