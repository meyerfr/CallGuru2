const BASE_URL = '/api/v1';

export const LOGOUT = 'LOGOUT'
export const ACCEPT_INVITE = 'ACCEPT_INVITE'
export const FETCH_COMPANIES = 'FETCH_COMPANIES'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const FETCH_USERS = 'FETCH_USERS'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'

export const FETCH_PLAYBOOKS = 'FETCH_PLAYBOOKS'
export const FETCH_PLAYBOOK = 'FETCH_PLAYBOOK'
export const FETCH_PLAYBOOK_SECTIONS = 'FETCH_PLAYBOOK_SECTIONS'
export const FETCH_CALL = 'FETCH_CALL'
export const CREATE_CALL = 'CREATE_CALL'
export const UPDATE_CALL_STATE = 'UPDATE_CALL_STATE'

export function logoutUser(callback) {
  const url = `users/sign_out`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const promise = fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    }
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' ? callback(r) : r);

  return {
    type: LOGOUT,
    payload: promise
  }
}

export function acceptInvite(user, callback) {
  const url = `users/invitation`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const promise = fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: { user }
  }).then(r => r.json())
    .then(r => typeof callback === 'function' ? callback(r) : r);

  return {
    type: ACCEPT_INVITE,
    payload: promise
  }
}

export function fetchCompanies(callback) {
  const url = `${BASE_URL}/companies`;
  const promise = fetch(url, {
    credentials: "same-origin"
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' ? callback(r) : r);
  // console.log("fetchCompanies")

  return {
    type: FETCH_COMPANIES,
    payload: promise
  }
}

export function createCompany(company, callback) {
  const url = `${BASE_URL}/companies`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(company)
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' && callback(r));

  return {
    type: CREATE_COMPANY,
    payload: promise
  }
}

export function addEmployee(company_id, user, callback) {
  const url = `${BASE_URL}/companies/${company_id}/users`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(user)
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' && callback(r));

  return {
    type: ADD_EMPLOYEE,
    payload: promise
  }
}

export function fetchUsers(company_id) {
  const url = `${BASE_URL}/companies/${company_id}/users`;
  // console.log("fetchUsers")
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_USERS,
    payload: promise
  }
}

export function fetchPlaybooks(company_id) {
  const url = `${BASE_URL}/companies/${company_id}/playbooks`;
  // console.log("fetchUsers")
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOKS,
    payload: promise
  }
}

export function fetchPlaybook(playbook_id) {
  const url = `${BASE_URL}/playbooks/${playbook_id}`;
  // console.log("fetchUsers")
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOK,
    payload: promise
  }
}

export function fetchSections(playbook_id) {
  const url = `${BASE_URL}/playbooks/${playbook_id}/sections`;
  // console.log("fetchUsers")
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOK_SECTIONS,
    payload: promise
  }
}

export function fetchCall(call_id) {
  const url = `${BASE_URL}/calls/${call_id}`;
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_CALL,
    payload: promise
  }
}

export function createCall(playbook_id) {
  const url = `${BASE_URL}/calls`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      playbook_id: playbook_id
    })
  }).then(r => r.json())
    // .then(data => callback(data));
    // .then(r => callback(r.json());

  return {
    type: CREATE_CALL,
    payload: promise // Will be resolved by redux-promise
  };
}

export function updateCallState(callId, selectedSection, body) {
  const url = `${BASE_URL}/calls/${callId}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
    // .then(data => callback(data));
    // .then(r => callback(r.json());

  return {
    type: UPDATE_CALL_STATE,
    payload: selectedSection
  };
}
