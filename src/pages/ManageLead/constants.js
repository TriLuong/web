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

/* LEAD-DETAIL */
export const GET_LEAD_REQUEST = 'GET_LEAD/REQUEST';
export const GET_LEAD_SUCCESS = 'GET_LEAD/SUCCESS';
export const GET_LEAD_FAILURE = 'GET_LEAD/FAILURE';

export default {};
