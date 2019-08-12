import React from 'react';
import { Link } from 'react-router-dom';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';
import MenuPopover from 'components/common/popover/MenuPopover';
import { MENU_POPOVER_ITEMS_QUALIFILED } from './constants';

/* eslint react/prop-types: 0 */
const QualifiledTable = ({ data, onSchedule, onClick }) => {
  const elemtLeads = data.map(lead => (
    <tr key={lead.id}>
      <td>{lead.Full_Name}</td>
      <td>{lead.Region ? lead.Region : ''}</td>
      <td>
        {lead.Phone}
        <br />
        {lead.Email}
      </td>
      <td>{`${lead.date} ${lead.time}`}</td>

      <td>
        {lead.status ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => onSchedule('broadcast', lead)}
            >
              BROADCAST
            </button>
            <MenuPopover
              menuItems={MENU_POPOVER_ITEMS_QUALIFILED}
              onClick={name => onClick({ actionLead: name, lead })}
            />
          </div>
        ) : (
          <div className="d-flex">
            <Link to={`/lead-detail/${lead.id}`} className="w-100">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => onSchedule('schedule', lead)}
              >
                SCHEDULE
              </button>
            </Link>

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
            Address
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            Contact
            <IconSort className="ml-2" />
          </th>
          <th className="sorting">
            {'Date & Time'}
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
