import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class InputGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { isSelect: false };
  }

  handleChange = event => {
    if (event.target.value) {
      this.setState({
        isSelect: true
      });
    } else {
      this.setState({
        isSelect: false
      });
    }
  };

  render() {
    const { label, name, type, id, value } = this.props;
    const { isSelect } = this.state;
    return (
      <div className={`form-custom ${isSelect ? 'form-custom hasValue' : ''}`}>
        <input
          name={name}
          type={type || 'text'}
          id={id || name}
          onChange={this.handleChange}
          value={value}
          className="form-control"
        />
        <label htmlFor={id || name}>{label}</label>
      </div>
    );
  }
}
InputGroup.defaultProps = {};
InputGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};
export default InputGroup;
