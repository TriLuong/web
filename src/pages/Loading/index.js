// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeGetLoading } from './selectors';
import './styles.scss';

type Props = {
  isLoading: Boolean,
};
class Loading extends React.PureComponent<Props> {
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

export default connect(mapStateToProps)(Loading);
