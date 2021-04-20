const BASE_URL = '/api/v1';

export const LOGOUT = 'LOGOUT'
export const ACCEPT_INVITE = 'ACCEPT_INVITE'
export const FETCH_COMPANIES = 'FETCH_COMPANIES'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const FETCH_USERS = 'FETCH_USERS'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'

export const FETCH_PLAYBOOKS = 'FETCH_PLAYBOOKS'

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
    .then(r => typeof callback === 'function' ? callback(r) : r);

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
  console.log(company_id)
  const url = `${BASE_URL}/companies/${company_id}/playbooks`;
  // console.log("fetchUsers")
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOKS,
    payload: promise
  }
}
