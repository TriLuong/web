import React from 'react';
import className from 'classnames';
import IconEdit from 'components/common/icon/IconEdit';
import './styles.scss';

type Props = {
  onClick: () => {},
  menuItems: [],
};

/* eslint jsx-a11y/click-events-have-key-events: 0
jsx-a11y/no-noninteractive-element-interactions: 0 */
export default class MenuPopover extends React.PureComponent<Props> {
  state = { isOpen: false };

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  toggleMenu = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
    if (!isOpen) {
      document.addEventListener('click', this.closeMenu);
    }
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.closeMenu);
  };

  render() {
    const { isOpen } = this.state;
    const { onClick, menuItems } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          className={className('btn btn-outline-secondary button-popover', { active: isOpen })}
          style={{ marginLeft: '10px' }}
          onClick={this.toggleMenu}
        >
          <IconEdit />
        </button>
        <div className={isOpen ? 'menu-popover show' : 'menu-popover dropdown-menu'}>
          <div className="menu-popover__inner">
            {menuItems.map(menuItem => (
              <p className="menu-popover__item" onClick={() => onClick(menuItem.name)}>
                {menuItem.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
