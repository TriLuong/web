import React, { PureComponent } from 'react';
import Select from 'react-select';

type Props = {
  onChange: () => {},
  value: any,
  name: String,
  isDisabled: Boolean,
  className: String,
  label: String,
  options: [],
  id: String,
};

/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/label-has-for: 0 jsx-a11y/no-static-element-interactions: 0 */
class GroupSelectField extends PureComponent<Props> {
  static getDerivedStateFromProps(props, state) {
    const isSelect = state.isInputChange
      || (props.value && (props.value.value || props.value.id)) || false;
    return { isSelect };
  }

  constructor(props) {
    super(props);
    this.state = {
      isSelect: (props.value && (props.value.value || props.value.id)) || false,
      menuIsOpen: false,
      isInputChange: false,
    };
  }

  handleChange = event => {
    const { onChange, name } = this.props;
    this.setState({
      isSelect: event.value || event || false,
      menuIsOpen: false,
    });
    onChange({ target: { name, value: event.value || event } });
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
    return null;
  };

  onMenuClose = () => {
    this.setState({ menuIsOpen: false, isInputChange: false });
  };

  onMenuOpen = () => {
    this.setState({ menuIsOpen: true });
  };

  onInputChange = value => {
    if (value) {
      this.setState({ isInputChange: true });
    } else {
      this.setState({ isInputChange: false });
    }
  };

  render() {
    const { className, value, label, options, isDisabled, name, id, ...rest } = this.props;
    const { isSelect, menuIsOpen } = this.state;
    return (
      <div
        className={`group-select ${className} ${isSelect ? 'group-select hasValue' : ''}`}
        onClick={this.onClickGroup}
      >
        <label htmlFor={id || name}>{label}</label>
        <Select
          name={name}
          value={value}
          {...rest}
          onChange={this.handleChange}
          options={options}
          clearable={false}
          className="group-select__inner"
          placeholder={null}
          classNamePrefix="group-select"
          menuIsOpen={menuIsOpen}
          onMenuClose={this.onMenuClose}
          onMenuOpen={this.onMenuOpen}
          onInputChange={this.onInputChange}
          isDisabled={isDisabled}
        />
      </div>
    );
  }
}

export default GroupSelectField;
