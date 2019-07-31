export const LEADS_FILTER = [
  { value: 'qualifiedLeads', label: 'Qualified Leads' },
  { value: 'broadcashLeads', label: 'Broadcash Leads' },
];

export const RADIO_QUALIFIELD = [
  { name: 'qualifiedLeads', label: 'All', value: 'all', defaultChecked: true },
  { name: 'qualifiedLeads', label: 'Without Date & Time', value: 'unScheduled' },
];
export const RADIO_BROADCAST = [
  { name: 'broadcashLeads', label: 'All', value: 'all', defaultChecked: true },
  { name: 'broadcashLeads', label: 'Scheduled', value: 'scheduled' },
  { name: 'broadcashLeads', label: 'Unscheduled', value: 'unScheduled' },
];

export const GET_LEADS_REQUEST = 'GET_LEADS/REQUEST';
export const GET_LEADS_SUCCESS = 'GET_LEADS/SUCCESS';
export const GET_LEADS_FAILURE = 'GET_LEADS/FAILURE';

export default {};
