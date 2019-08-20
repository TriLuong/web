import React, { PureComponent } from 'react';
import './styles.scss';

type Props = {
  lead: {
    Full_Name: String,
  },
  breadcrumbFirst: String,
  pathName: String,
  children: {},
};

/* eslint react/prop-types: 0 */
class BreadCrumb extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { lead, breadcrumbFirst, pathName, children } = this.props;
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href={pathName}>{breadcrumbFirst}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {lead.Full_Name}
          </li>
          <div className="d-flex breadcrumb-children">
            {children.map(child => (
              <li>{child}</li>
            ))}
          </div>
        </ol>
      </nav>
    );
  }
}

export default BreadCrumb;
