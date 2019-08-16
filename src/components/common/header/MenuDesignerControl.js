import React, { PureComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import './styles.scss';

/* eslint jsx-a11y/anchor-is-valid: 0 */
type Props = {
  onActiveTabChange: () => {},
};
class MenuDesignerControl extends PureComponent<Props> {
  constructor() {
    super();

    this.state = {
      activeTab: '1',
    };
  }

  toggle = tab => {
    const { onActiveTabChange } = this.props;
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      onActiveTabChange(tab);
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div className="menu-control">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === '1',
              })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <span className="icon lnr lnr-list" />
              Scheduled
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === '2',
              })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              <span className="icon lnr lnr-chart-bars" />
              Incoming Leads
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === '3',
              })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              <span className="icon lnr lnr-chart-bars" />
              My Leads
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === '4',
              })}
              onClick={() => {
                this.toggle('4');
              }}
            >
              <span className="icon lnr lnr-chart-bars" />
              Availability
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
export default MenuDesignerControl;
