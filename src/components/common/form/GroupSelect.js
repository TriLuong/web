import React, { PureComponent } from 'react';
import Select from 'react-select';

class GroupSelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isSelect: (props.value && props.value.value) || false, menuIsOpen: false };
  }

  handleChange = event => {
    const { onChange, name } = this.props;
    this.setState({
      isSelect: event.value || false,
      menuIsOpen: false,
    });
    onChange(name, event.value);
  };

  onClickGroup = () => {
    const { isDisabled } = this.props;
    if (isDisabled) {
      return null;
    }
    if (!this.flagFirst) {
      this.setState({ menuIsOpen: true });
      this.flagFirst = true;
    } else {
      this.flagFirst = false;
    }
  };

  onMenuClose = () => {
    this.setState({ menuIsOpen: false });
  };

  render() {
    const { className, value, label, options, isDisabled } = this.props;
    const { isSelect, menuIsOpen } = this.state;
    return (
      <div
        className={`group-select ${className} ${isSelect ? 'group-select hasValue' : ''}`}
        onClick={this.onClickGroup}
      >
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
          menuIsOpen={menuIsOpen}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuClose}
          onInputChange={this.onMenuClose}
          isDisabled={isDisabled}
        />
      </div>
    );
  }
}

export default GroupSelectField;
