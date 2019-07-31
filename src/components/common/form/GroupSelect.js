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
    const { value, label, options, name } = this.props;
    const { isSelect, menuIsOpen } = this.state;
    return (
      <div
        className={`group-select ${isSelect ? 'group-select hasValue' : ''}`}
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
        />
      </div>
    );
  }
}

export default GroupSelectField;
