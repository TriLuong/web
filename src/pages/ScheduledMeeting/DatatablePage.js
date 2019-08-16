import React, { useState } from 'react';
import IconSort from 'components/common/icon/IconSort';
import Pagination from 'components/common/pagination';
import MenuPopover from 'components/common/popover/MenuPopover';
import { MENU_POPOVER_ITEMS_SCHEDULED_MEETING } from 'pages/Designer/constants';

/* eslint react/prop-types: 0 */
const DatatablePage = ({ gotoPage, onSort, onSchedule, onClick, data }) => {
  const [sortBy, setSortby] = useState('');
  const dataScheduled = (data && data.leads) || [];
  const elemtLeads = dataScheduled.map(lead => {
    let date;
    let time;
    if (lead.Meeting_Date_and_Time) {
      const dateTimeArr = lead.Meeting_Date_and_Time.split('T');
      date = dateTimeArr[0];
      const hour = dateTimeArr[1].split(':')[0];
      const minute = dateTimeArr[1].split(':')[1];
      time = `${hour}:${minute}`;
    }
    return (
      <tr key={lead.id}>
        <td>{lead.Full_Name}</td>
        <td>{lead.Region ? lead.Region : ''}</td>
        <td>
          {lead.Phone}
          <br />
          {lead.Email}
        </td>
        <td>{lead.Meeting_Date_and_Time ? `${date} • ${time}` : 'Not available'}</td>

        <td>
          <div className="d-flex scheduledMeeting">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => onSchedule('meetingInfo', lead)}
            >
              MEETING INFO
            </button>
            <MenuPopover
              menuItems={MENU_POPOVER_ITEMS_SCHEDULED_MEETING}
              onClick={name => onClick({ actionLead: name, lead })}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="table-sort">
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
                setSortby('Region');
                onSort({ orderBy: 'Region' });
              }}
            >
              Address
              <IconSort className="ml-2" fill={sortBy === 'Region' ? '#05486c' : 'white'} />
            </th>
            <th
              className="sorting"
              onClick={() => {
                setSortby('Phone');
                onSort({ orderBy: 'Phone' });
              }}
            >
              Contact
              <IconSort className="ml-2" fill={sortBy === 'Phone' ? '#05486c' : 'white'} />
            </th>
            <th
              className="sorting"
              onClick={() => {
                setSortby('Meeting_Date_and_Time');
                onSort({ orderBy: 'Meeting_Date_and_Time' });
              }}
            >
              {'Date & Time'}
              <IconSort
                className="ml-2"
                fill={sortBy === 'Meeting_Date_and_Time' ? '#05486c' : 'white'}
              />
            </th>
            <th className="sorting" />
          </tr>
        </thead>
        <tbody>{elemtLeads}</tbody>
      </table>
      <div className="table-sort__paginate">
        <Pagination pages={data.pages} page={data.page} gotoPage={gotoPage} />
      </div>
    </div>
  );
};

export default DatatablePage;
