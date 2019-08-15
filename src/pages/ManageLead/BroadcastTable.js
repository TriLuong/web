import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconSort from 'components/common/icon/IconSort';
import MenuPopover from 'components/common/popover/MenuPopover';
import { MENU_POPOVER_ITEMS_BROADCASR, MENU_POPOVER_ITEMS_ASSIGN_DESIGNER } from './constants';
/* eslint react/prop-types: 0 */
const BroadcastTable = ({ data, onSchedule, onClick, branches, onSort }) => {
  const [sortBy, setSortby] = useState('');

  // let dataFilter = {};

  // if (filter === 'all') {
  //   dataFilter = data;
  // } else if (filter === 'scheduled') {
  //   dataFilter = data.filter(l => l.broadcastType);
  // } else {
  //   dataFilter = data.filter(l => !l.broadcastType);
  // }

  /* eslint radix: 0 */
  const elemtLeads = data.map(lead => {
    let branch = null;
    let date;
    let time;
    if (lead.Meeting_Date_and_Time) {
      const dateTimeArr = lead.Meeting_Date_and_Time.split('T');
      date = dateTimeArr[0];
      const hourInt = parseInt(dateTimeArr[1].split(':')[0]);
      const typeTime = hourInt < 12 ? 'AM' : 'PM';
      const hour = hourInt <= 12 ? hourInt : hourInt - 12;
      const minute = dateTimeArr[1].split(':')[1];
      time = `${hour}:${minute} ${typeTime}`;
    }
    if (lead.broadcastType) {
      branch = branches.find(br => br.id === lead.branchId);
    }
    return (
      <tr key={lead.id}>
        <td>{lead.Full_Name}</td>
        <td>{!branch ? '_' : branch.name}</td>
        <td>
          {lead.meetingStatus ? 'Scheduled' : 'Unscheduled'}
          <br />
          {lead.Meeting_Date_and_Time ? `${date} • ${time}` : ''}
        </td>
        <td>_</td>

        <td>
          {lead.broadcastType !== 'all' ? (
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
              <MenuPopover
                menuItems={MENU_POPOVER_ITEMS_ASSIGN_DESIGNER}
                onClick={name => onClick({ actionLead: name, lead })}
              />
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
          <th
            className="sorting"
            onClick={() => {
              setSortby('Full_Name');
              onSort({ orderBy: 'Full_Name' });
            }}
          >
            Name (A-Z)
            <IconSort className="ml-2" fill={sortBy === 'Full_Name' ? '#05486c' : 'white'} />
          </th>
          <th
            className="sorting"
            onClick={() => {
              setSortby('branchId');
              onSort({ orderBy: 'branchId' });
            }}
          >
            Branch
            <IconSort className="ml-2" fill={sortBy === 'branchId' ? '#05486c' : 'white'} />
          </th>
          <th
            className="sorting"
            onClick={() => {
              setSortby('meetingStatus');
              onSort({ orderBy: 'meetingStatus' });
            }}
          >
            Metting status
            <IconSort className="ml-2" fill={sortBy === 'meetingStatus' ? '#05486c' : 'white'} />
          </th>
          <th
            className="sorting"
            onClick={() => {
              setSortby('broadcastType');
              onSort({ orderBy: 'broadcastType' });
            }}
          >
            Designer
            <IconSort className="ml-2" fill={sortBy === 'broadcastType' ? '#05486c' : 'white'} />
          </th>
          <th className="sorting" />
        </tr>
      </thead>
      <tbody>{elemtLeads}</tbody>
    </table>
  );
};

export default BroadcastTable;
