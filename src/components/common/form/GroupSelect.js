import React, { PureComponent } from 'react';
import Select from 'react-select';
// import PropTypes from 'prop-types';

/* eslint-disable */
class GroupSelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { isSelect: false };
  }

  handleChange = event => {
    // const { onChange } = this.props;
    // console.log(event);
    if (event.value) {
      this.setState({
        isSelect: true,
      });
      // onChange(event);
    } else {
      this.setState({
        isSelect: false,
      });
    }
  };

  render() {
    const { value, name, label } = this.props;
    const { isSelect } = this.state;

    return (
      <div className={`group-select ${isSelect ? 'group-select hasValue' : ''}`}>
        <label>{label}</label>
        <Select
          name={name}
          value={value}
          onChange={this.handleChange}
          options={this.props.options}
          clearable={false}
          className="group-select__inner"
          placeholder={null}
          classNamePrefix="group-select"
        />
      </div>
    );
  }
}

export default GroupSelectField;
