import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import IconArrowDown from '../icon/IconArrowDown';

class FormDropdown extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      currentItem: props.options[0],
    };
  }

  getCurrentItem(item) {
    this.setState({ currentItem: item });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { className, options } = this.props;
    const { dropdownOpen, currentItem } = this.state;
    return (
      <Dropdown className={className} isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle>{currentItem.label}</DropdownToggle>
        <IconArrowDown className="dropdown__icon" />
        <DropdownMenu>
          {options.map(item => (
            <DropdownItem key={item.value} onClick={() => this.getCurrentItem(item)}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
FormDropdown.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
};
FormDropdown.defaultProps = {
  className: '',
  options: [],
};
export default FormDropdown;
