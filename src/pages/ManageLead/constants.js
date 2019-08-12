export const LEADS_FILTER = [
  { value: 'qualifiedLeads', label: 'Qualified Leads' },
  { value: 'broadcashLeads', label: 'Broadcash Leads' },
];

export const RADIO_QUALIFIELD = [
  { name: 'qualifiedLeads', label: 'All', value: 'all' },
  { name: 'qualifiedLeads', label: 'Without Date & Time', value: 'unScheduled' },
];
export const RADIO_BROADCAST = [
  { name: 'broadcashLeads', label: 'All', value: 'all' },
  { name: 'broadcashLeads', label: 'Scheduled', value: 'scheduled' },
  { name: 'broadcashLeads', label: 'Unscheduled', value: 'unScheduled' },
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

export const GET_LEADS_REQUEST = 'GET_LEADS/REQUEST';
export const GET_LEADS_SUCCESS = 'GET_LEADS/SUCCESS';
export const GET_LEADS_FAILURE = 'GET_LEADS/FAILURE';

export const DELETE_LEAD_REQUEST = 'DELETE_LEAD/REQUEST';
export const DELETE_LEAD_SUCCESS = 'DELETE_LEAD/SUCCESS';
export const DELETE_LEAD_FAILURE = 'DELETE_LEAD/FAILURE';

export const GET_BRANCHES_REQUEST = 'GET_BRANCHES/REQUEST';
export const GET_BRANCHES_SUCCESS = 'GET_BRANCHES/SUCCESS';
export const GET_BRANCHES_FAILURE = 'GET_BRANCHES/FAILURE';

/* LEAD-DETAIL */
export const GET_LEAD_BY_ID_REQUEST = 'GET_LEAD_BY_ID/REQUEST';
export const GET_LEAD_BY_ID_SUCCESS = 'GET_LEAD_BY_ID/SUCCESS';
export const GET_LEAD_BY_ID_FAILURE = 'GET_LEAD_BY_ID/FAILURE';

export default {};
