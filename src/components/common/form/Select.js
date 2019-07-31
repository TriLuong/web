import React, { PureComponent } from 'react';
import Select from 'react-select';

type Props = {
  onChange: () => {},
  value: String,
  name: string,
  defaultValue: string,
  options: [],
  placeholder: String,
};
class SelectField extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = selectedOption => {
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const { value, name, defaultValue, options, placeholder, ...rest } = this.props;

    return (
      <Select
        {...rest}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="wrap-select__inner"
        placeholder={placeholder}
        classNamePrefix="wrap-select"
        isSearchable={false}
      />
    );
  }
}

const renderSelectField = props => (
  <div className="wrap-select">
    <SelectField {...props} />
  </div>
);

export default renderSelectField;
