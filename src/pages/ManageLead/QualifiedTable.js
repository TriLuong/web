/* eslint-disable */
import React from 'react';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';

const QualifiledTable = ({ data, onSchedule }) => {
  const elemtLeads = data.map(lead => (
    <tr key={lead.id}>
      <td>{`${lead.firstName} ${lead.lastName}`}</td>
      <td>{lead.address}</td>
      <td>
        {lead.phone}
        <br />
        {lead.email}
      </td>
      <td>{`${lead.date} ${lead.time}`}</td>

      <td>
        <div className="d-flex">
          <button type="button" className="btn btn-primary" onClick={() => onSchedule(lead.status)}>
            {lead.status === 'scheduled' ? 'BROACASH' : 'SCHEDULE'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ marginLeft: '10px' }}
          >
            <IconEdit />
          </button>
        </div>
      </td>
    </tr>
  ));
  return (
    <table entries="10" className="table">
      <thead>
        <tr>
          <th className="sorting">
            Name (A-Z)
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            Address
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            Contact
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            {`Date & Time`}
            <IconSort className="ml-2" />
          </th>
          <th className="sorting" />
        </tr>
      </thead>
      <tbody>{elemtLeads}</tbody>
    </table>
  );
};

export default QualifiledTable;
