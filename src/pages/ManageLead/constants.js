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

export default {};
