import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'components/common/pagination';
import IconEdit from 'components/common/icon/IconEdit';
import userList from 'userList';

const DatatablePage = () => {
  const elemtUser = userList.map(user => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.branch}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>
        <button type="button" className="btn btn-primary">
          EDIT
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-secondary">
          <IconEdit />
        </button>
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
              <FontAwesomeIcon color="#fff" icon={faSort} />
            </th>
            <th className="sorting">
              Branch (A-Z)
              <FontAwesomeIcon color="#fff" icon={faSort} />
            </th>
            <th className="sorting">
              Email
              <FontAwesomeIcon color="#fff" icon={faSort} />
            </th>
            <th className="sorting">
              Type
              <FontAwesomeIcon color="#fff" icon={faSort} />
            </th>
            <th className="sorting" />
            <th className="sorting" />
          </tr>
        </thead>
        <tbody>{elemtUser}</tbody>
      </table>
      <div className="table-sort__paginate">
        <Pagination />
      </div>
    </div>
  );
};

export default DatatablePage;
