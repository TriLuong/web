import React, { useState } from 'react';
import Pagination from 'components/common/pagination';
import IconSort from 'components/common/icon/IconSort';
import MenuPopover from 'components/common/popover/MenuPopover';

/* eslint react/destructuring-assignment: 0 react/prop-types: 0 */
const DatatablePage = ({ data, gotoPage, onEdit, onSort, onClickItem }) => {
  const [sortBy, setSortby] = useState('');

  if (!data || !data.users) {
    return null;
  }

  const elemtUser = data.users.map(user => (
    <tr key={user.id}>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.branch}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>
        <div className="d-flex">
          <button type="button" className="btn btn-primary" onClick={() => onEdit(user)}>
            EDIT
          </button>
          <MenuPopover onClick={() => onClickItem(user.id)} />
        </div>
      </td>
    </tr>
  ));
  const empty = (
    <div className="text-center my-3">
      <p>No result</p>
    </div>
  );

  return (
    <div className="table-sort">
      <table entries="10" className="table">
        <thead>
          <tr>
            <th
              className="sorting"
              onClick={() => {
                setSortby('firstName');
                onSort({ orderBy: 'firstName' });
              }}
            >
              Name (A-Z)
              <IconSort className="ml-2" fill={sortBy === 'firstName' ? '#05486c' : 'white'} />
            </th>
            <th
              className="sorting"
              onClick={() => {
                setSortby('branch');
                onSort({ orderBy: 'branch' });
              }}
            >
              Branch (A-Z)
              <IconSort className="ml-2" fill={sortBy === 'branch' ? '#05486c' : 'white'} />
            </th>
            <th
              className="sorting"
              onClick={() => {
                setSortby('email');
                onSort({ orderBy: 'email' });
              }}
            >
              Email
              <IconSort className="ml-2" fill={sortBy === 'email' ? '#05486c' : 'white'} />
            </th>
            <th
              className="sorting"
              onClick={() => {
                setSortby('type');
                onSort({ orderBy: 'type' });
              }}
            >
              Type
              <IconSort className="ml-2" fill={sortBy === 'type' ? '#05486c' : 'white'} />
            </th>
            <th className="sorting" style={{ width: '150px' }} />
          </tr>
        </thead>
        <tbody>{elemtUser}</tbody>
      </table>
      {data.users.length === 0 && empty}
      {data.users.length > 0 && (
        <div className="table-sort__paginate">
          <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
        </div>
      )}
    </div>
  );
};

export default DatatablePage;
