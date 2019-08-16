import React, { PureComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import IconSchedule from 'components/common/icon/IconSchedule';
import IconIncoming from 'components/common/icon/IconIncoming';
import IconMylead from 'components/common/icon/IconMylead';
import IconCheck from 'components/common/icon/IconCheck';
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
              <IconSchedule />
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
              <IconIncoming />
              Incoming Leads
              <span className="badge badge-primary">5</span>
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
              <IconMylead />
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
              <IconCheck />
              Availability
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
export default MenuDesignerControl;
