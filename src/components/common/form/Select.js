import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = selectedOption => {
    this.props.onChange(selectedOption);
  };

  render() {
    const { value, name } = this.props;

    return (
      <Select
        name={name}
        defaultValue={this.props.defaultValue}
        value={value}
        //onChange={this.handleChange}
        options={this.props.options}
        clearable={false}
        className="wrap-select__inner"
        placeholder={this.props.placeholder}
        classNamePrefix="wrap-select"
      />
    );
  }
}

const renderSelectField = props => (
  <div className="wrap-select">
    <SelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
    />
  </div>
);

renderSelectField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.array
};

export default renderSelectField;
