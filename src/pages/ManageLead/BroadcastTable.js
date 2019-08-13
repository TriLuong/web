import React from 'react';
import { Link } from 'react-router-dom';
import IconEdit from 'components/common/icon/IconEdit';
import IconSort from 'components/common/icon/IconSort';
import MenuPopover from 'components/common/popover/MenuPopover';
import { MENU_POPOVER_ITEMS_BROADCASR } from './constants';
/* eslint react/prop-types: 0 */
const BroadcastTable = ({ data, onSchedule, onClick, branches, filter }) => {
  let dataFilter = {};

  if (filter === 'all') {
    dataFilter = data;
  } else if (filter === 'scheduled') {
    dataFilter = data.filter(l => l.broadcastType);
  } else {
    dataFilter = data.filter(l => !l.broadcastType);
  }

  const elemtLeads = dataFilter.map(lead => {
    let branch = null;
    if (lead.broadcastType) {
      branch = branches.find(br => br.id === lead.branchId);
    }
    return (
      <tr key={lead.id}>
        <td>{lead.Full_Name}</td>
        <td>{!branch ? '_' : branch.name}</td>
        <td>
          {lead.broadcastType ? 'Scheduled' : 'Unscheduled'}
          <br />
          {`${lead.date} ${lead.time}`}
        </td>
        <td>{lead.broadcastType ? lead.broadcastType : '_'}</td>

        <td>
          {lead.broadcastType ? (
            <div className="d-flex">
              <Link to={`/lead-detail/${lead.id}`} className="w-100">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={() => onSchedule('schedule', lead)}
                >
                  EDIT MEETING
                </button>
              </Link>
              <MenuPopover
                menuItems={MENU_POPOVER_ITEMS_BROADCASR}
                onClick={name => onClick({ actionLead: name, lead })}
              />
            </div>
          ) : (
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => onSchedule('assignDesigner', lead)}
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
    );
  });

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
