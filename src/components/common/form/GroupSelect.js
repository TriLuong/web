import React, { PureComponent } from 'react';
import Select from 'react-select';

class GroupSelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isSelect: (props.value && props.value.value) || false };
  }

  handleChange = event => {
    const { onChange, name } = this.props;
    this.setState({
      isSelect: event.value || false,
    });
    onChange(name, event.value);
  };

  render() {
    const { value, label, options } = this.props;
    const { isSelect } = this.state;

    return (
      <div className={`group-select ${isSelect ? 'group-select hasValue' : ''}`}>
        <label>{label}</label>
        <Select
          value={value}
          onChange={this.handleChange}
          options={options}
          clearable={false}
          className="group-select__inner"
          placeholder={null}
          classNamePrefix="group-select"
          isSearchable={false}
        />
      </div>
    );
  }
}

export default GroupSelectField;
