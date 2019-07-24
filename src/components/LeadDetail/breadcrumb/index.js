import React, { PureComponent } from 'react';
import './styles.scss';

class BreadCrumb extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Manage Leads</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Jayaprasad Mohanan
          </li>
        </ol>
      </nav>
    );
  }
}

export default BreadCrumb;
