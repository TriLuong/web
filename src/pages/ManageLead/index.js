import React, { Component } from 'react';
import Header from 'components/common/header';
import IconSearch from 'components/common/icon/IconSearch';
import SelectField from 'components/common/form/Select';
import DatatablePage from './DatatablePage';
import './styles.scss';

const optionsUser = [
  { value: 'all', label: 'All Users' },
  { value: 'Name', label: 'Name' },
  { value: 'Branch', label: 'Branch' },
];
class SalesPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="document">
        <Header />
        <div className="container">
          <div className="top-control">
            <h1 className="top-control__header">Manage Leads</h1>
            <div
              className="btn-toolbar ml-auto"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <SelectField
                className="mr-2"
                options={optionsUser}
                placeholder="Qualified Leads"
              />
              <div className="top-control__search">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
                <IconSearch className="top-control__search__icon" />
              </div>
            </div>
          </div>
          <DatatablePage />
        </div>
      </div>
    );
  }
}

export default SalesPage;
