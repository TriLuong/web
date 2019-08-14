export const LEADS_FILTER = [
  { value: 'qualifiedLeads', label: 'Qualified Leads' },
  { value: 'broadcastLeads', label: 'Broadcast Leads' },
];

export const RADIO_QUALIFIELD = [
  { name: 'qualifiedLeads', label: 'All', value: 'all' },
  { name: 'qualifiedLeads', label: 'Without Date & Time', value: 'unScheduled' },
];
export const RADIO_BROADCAST = [
  { name: 'broadcastLeads', label: 'All', value: 'all' },
  { name: 'broadcastLeads', label: 'Scheduled', value: 'scheduled' },
  { name: 'broadcastLeads', label: 'Unscheduled', value: 'unScheduled' },
];

export const MENU_POPOVER_ITEMS_QUALIFILED = [
  { label: 'Broadcast Again', name: 'broadcastAgain' },
  { label: 'Assign to Different Branch', name: 'assignDiffBranch' },
  { label: 'Delete Lead', name: 'deleteLead' },
];

export const MENU_POPOVER_ITEMS_BROADCASR = [
  { label: 'Cancel Meeting', name: 'cancelMeeting' },
  { label: 'Delete Lead', name: 'deleteLead' },
];
export const MENU_POPOVER_ITEMS_SCHEDULE = [{ label: 'Delete Lead', name: 'deleteLead' }];

export const GET_LEADS_REQUEST = 'GET_LEADS/REQUEST';
export const GET_LEADS_SUCCESS = 'GET_LEADS/SUCCESS';
export const GET_LEADS_FAILURE = 'GET_LEADS/FAILURE';

export const DELETE_LEAD_REQUEST = 'DELETE_LEAD/REQUEST';
export const DELETE_LEAD_SUCCESS = 'DELETE_LEAD/SUCCESS';
export const DELETE_LEAD_FAILURE = 'DELETE_LEAD/FAILURE';

/* LEAD-DETAIL */
export const UPDATE_LEAD_REQUEST = 'UPDATE_LEAD/REQUEST';
export const UPDATE_LEAD_SUCCESS = 'UPDATE_LEAD/SUCCESS';
export const UPDATE_LEAD_FAILURE = 'UPDATE_LEAD/FAILURE';

export const dataDesigners = [
  [
    {
      id: 1,
      name: 'Designer 1',
      timeFrom: '10:00AM',
      timeTo: '5:30PM',
    },
    {
      id: 2,
      name: 'Designer 2',
      timeFrom: '11:00AM',
      timeTo: '4:30PM',
    },
    {
      id: 3,
      name: 'Designer 3',
      timeFrom: '10:30AM',
      timeTo: '5:00PM',
    },
  ],
  [
    {
      id: 4,
      name: 'Designer 4',
      timeFrom: '12:00PM',
      timeTo: '5:30PM',
    },
    {
      id: 5,
      name: 'Designer 5',
      timeFrom: '1:00PM',
      timeTo: '6:30PM',
    },
    {
      id: 6,
      name: 'Designer 6',
      timeFrom: '2:00PM',
      timeTo: '7:30PM',
    },
  ],
  [
    {
      id: 7,
      name: 'Designer 7',
      timeFrom: '11:00AM',
      timeTo: '12:30PM',
    },
    {
      id: 8,
      name: 'Designer 8',
      timeFrom: '1:00PM',
      timeTo: '8:30PM',
    },
    {
      id: 9,
      name: 'Designer 9',
      timeFrom: '10:00AM',
      timeTo: '8:30PM',
    },
  ],
  [
    {
      id: 10,
      name: 'Designer 10',
      timeFrom: '10:00AM',
      timeTo: '6:30PM',
    },
  ],
];

export default {};
