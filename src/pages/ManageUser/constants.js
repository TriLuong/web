export const GET_USERS_REQUEST = 'GET_USERS/REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS/SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS/FAILURE';

export const ADD_USERS_REQUEST = 'ADD_USERS/REQUEST';
export const ADD_USERS_SUCCESS = 'ADD_USERS/SUCCESS';
export const ADD_USERS_FAILURE = 'ADD_USERS/FAILURE';

export const UPDATE_USERS_REQUEST = 'UPDATE_USERS/REQUEST';
export const UPDATE_USERS_SUCCESS = 'UPDATE_USERS/SUCCESS';
export const UPDATE_USERS_FAILURE = 'UPDATE_USERS/FAILURE';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE/REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE/SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE/FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD/REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD/SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD/FAILURE';

export const GET_BRANCHES_REQUEST = 'GET_BRANCHES/REQUEST';
export const GET_BRANCHES_SUCCESS = 'GET_BRANCHES/SUCCESS';
export const GET_BRANCHES_FAILURE = 'GET_BRANCHES/FAILURE';

export const MENU_POPOVER_ITEMS_MANAGE_USER = [{ label: 'Delete Lead', name: 'deleteLead' }];

export const USER_FILTER = [
  { value: 'all', label: 'All Users' },
  { value: 'role=designer&type=Design Partner', label: 'Design Partner' },
  { value: 'role=designer&type=In-house', label: 'In house designer ' },
  { value: 'role=sale', label: 'Sales' },
];

export const TYPE_DESIGNER = [
  { value: 'In-house', label: 'In house' },
  { value: 'Design Partner', label: 'Design Partner' },
];

export const USER_TYPE = [
  { value: 'sale', label: 'Sale' },
  { value: 'designer', label: 'Designer' },
];
export const USER_BRANCH = [
  { value: 'MG Road Experience Center', label: 'MG Road Experience Center' },
  { value: 'Whitefield Experience Center', label: 'Whitefield Experience Center' },
  { value: 'Mumbai DC Experience Center', label: 'Mumbai DC Experience Center' },
];

export const BULK_UPLOAD_REQUEST = 'MANAGE_USER/BULK_UPLOAD_REQUEST';
export const BULK_UPLOAD_SUCCESS = 'MANAGE_USER/BULK_UPLOAD_SUCCESS';
export const BULK_UPLOAD_FAILURE = 'MANAGE_USER/BULK_UPLOAD_FAILURE';

export const DELETE_USER_REQUEST = 'MANAGE_USER/DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'MANAGE_USER/DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'MANAGE_USER/DELETE_USER_FAILURE';
