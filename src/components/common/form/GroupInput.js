import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* eslint react/require-default-props: 0 jsx-a11y/label-has-for: 0 */
class InputGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { isSelect: props.value || false };
  }

  /* eslint react/prop-types: 0 */
  handleChange = event => {
    const { onChange } = this.props;
    if (event.target.value) {
      this.setState({
        isSelect: true,
      });
    } else {
      this.setState({
        isSelect: false,
      });
    }
    onChange(event);
  };

  render() {
    const { label, name, id, ...rest } = this.props;
    const { isSelect } = this.state;
    return (
      <div className={`form-custom ${isSelect ? 'form-custom hasValue' : ''}`}>
        <input {...rest} name={name} id={id || name} onChange={this.handleChange} className="form-control" />
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
  type: PropTypes.string,
};
export default InputGroup;
