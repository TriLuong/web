import React from 'react';
import Pagination from 'components/common/pagination';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';
/* eslint react/destructuring-assignment: 0 react/prop-types: 0 */
const DatatablePage = ({ data, gotoPage }) => {
  if (!data || !data.users) {
    return null;
  }
  const elemtUser = data.users.map(user => (
    <tr key={user.id}>
      <td>{user.firstName}</td>
      <td>{user.branch}</td>
      <td>{user.email}</td>
      <td>{user.typeDesigner}</td>
      <td>
        <div className="d-flex">
          <button type="button" className="btn btn-primary">
            EDIT
          </button>
          <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: '10px' }}>
            <IconEdit />
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="table-sort">
      <table entries="10" className="table">
        <thead>
          <tr>
            <th className="sorting">
              Name (A-Z)
              <IconSort className="ml-2" />
            </th>
            <th className="sorting">
              Branch (A-Z)
              <IconSort className="ml-2" />
            </th>
            <th className="sorting">
              Email
              <IconSort className="ml-2" />
            </th>
            <th className="sorting">
              Type
              <IconSort className="ml-2" />
            </th>
            <th className="sorting" style={{ width: '150px' }} />
          </tr>
        </thead>
        <tbody>{elemtUser}</tbody>
      </table>
      <div className="table-sort__paginate">
        <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
      </div>
    </div>
  );
};

export default DatatablePage;
