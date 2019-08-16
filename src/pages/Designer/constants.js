export const MENU_POPOVER_ITEMS_SCHEDULED_MEETING = [
  { label: 'Resend Confirmation Email', name: 'resendConfirmEmail' },
  { label: 'Reschedule', name: 'reSchedule' },
  { label: 'Cancel Meeting', name: 'cancelMeeting' },
];

export const RADIO_SCHEDULED_MEETING = [
  { name: 'scheduledMeeting', label: 'All', value: '' },
  { name: 'scheduledMeeting', label: 'Today', value: 'today' },
  { name: 'scheduledMeeting', label: 'This Week', value: 'thisWeek' },
];

export const GET_LEADS_SCHEDULED_REQUEST = 'GET_LEADS_SCHEDULED/REQUEST';
export const GET_LEADS_SCHEDULED_SUCCESS = 'GET_LEADS_SCHEDULED/SUCCESS';
export const GET_LEADS_SCHEDULED_FAILURE = 'GET_LEADS_SCHEDULED/FAILURE';

export default {};
