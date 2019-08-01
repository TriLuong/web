/* eslint-disable */
import React from 'react';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';
import MenuPopover from 'components/common/popover/MenuPopover';
const BroadcastTable = ({ data, onSchedule }) => {
  const elemtLeads = data.map(lead => (
    <tr key={lead.id}>
      <td>{`${lead.firstName} ${lead.lastName}`}</td>
      <td>{lead.branch}</td>
      <td>
        {lead.status}
        <br />
        {`${lead.date} ${lead.time}`}
      </td>
      <td>{lead.designer}</td>

      <td>
        {lead.status === 'scheduled' ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSchedule(lead.status)}
            >
              EDIT MEETING
            </button>
            <MenuPopover />
          </div>
        ) : (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSchedule(lead.status)}
            >
              ASSIGN DESIGNER
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ marginLeft: '10px' }}
            >
              <IconEdit />
            </button>
          </div>
        )}
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
            Branch
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            Metting status
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            Designer
            <IconSort className="ml-2" />
          </th>
          <th className="sorting" />
        </tr>
      </thead>
      <tbody>{elemtLeads}</tbody>
    </table>
  );
};

export default BroadcastTable;
