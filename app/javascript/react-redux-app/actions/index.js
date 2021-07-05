const BASE_URL = '/api/v1';

export const LOGOUT = 'LOGOUT'
export const ACCEPT_INVITE = 'ACCEPT_INVITE'
export const FETCH_COMPANIES = 'FETCH_COMPANIES'
export const FETCH_COMPANY = 'FETCH_COMPANY'
export const UPDATE_COMPANY = 'UPDATE_COMPANY'
export const UPLOAD_LOGO = 'UPLOAD_LOGO'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const FETCH_USERS = 'FETCH_USERS'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'

export const FETCH_PLAYBOOKS = 'FETCH_PLAYBOOKS'
export const FETCH_PLAYBOOK = 'FETCH_PLAYBOOK'
export const FETCH_PLAYBOOK_SECTIONS = 'FETCH_PLAYBOOK_SECTIONS'
export const FETCH_CALL = 'FETCH_CALL'
export const CREATE_CALL = 'CREATE_CALL'
export const UPDATE_CALL_NAME = 'UPDATE_CALL_NAME'
export const UPDATE_CALL_STATE = 'UPDATE_CALL_STATE'
export const FETCH_CONTENT_TYPES = 'FETCH_CONTENT_TYPES'

export const UPDATE_USER = 'UPDATE_USER'
export const UPLOAD_AVATAR = 'UPLOAD_AVATAR'

export function logoutUser(callback) {
  const url = `/users/sign_out`;
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
  const url = `/users/invitation`;
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

  return {
    type: FETCH_COMPANIES,
    payload: promise
  }
}

export function fetchCompany(company_id, callback) {
  const url = `${BASE_URL}/companies/${company_id}`;
  const promise = fetch(url, {
    credentials: "same-origin"
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' ? callback(r) : r);

  return {
    type: FETCH_COMPANY,
    payload: promise
  }
}

export function updateCompany(company, callback) {
  const url = `${BASE_URL}/companies/${company.id}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(company)
  }).then(r => r.json())
    .then(r => typeof callback === 'function' && callback(r));


  return {
    type: UPDATE_COMPANY,
    payload: company
  }
}

export function uploadLogo(company, callback) {
  const url = `${BASE_URL}/companies/${company.id}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const data = new FormData()
  data.append('company[logo]', company.logo)

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: data
  }).then(r => r.json())
    .then(r => typeof callback === 'function' ? callback(r) : r);

  return{
    type: UPLOAD_LOGO,
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

export function addEmployee(company_id, user, sendAutomaticMail) {
  const url = `${BASE_URL}/companies/${company_id}/users?sendAutomaticMail=${sendAutomaticMail}`;
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
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_USERS,
    payload: promise
  }
}

export function fetchPlaybooks(company_id) {
  const url = `${BASE_URL}/companies/${company_id}/playbooks`;
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOKS,
    payload: promise
  }
}

export function fetchPlaybook(playbook_id) {
  const url = `${BASE_URL}/playbooks/${playbook_id}`;
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_PLAYBOOK,
    payload: promise
  }
}

export function fetchSections(playbook_id) {
  const url = `${BASE_URL}/playbooks/${playbook_id}/sections`;
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

export function updateCallState(contentBlocks, callId) {

  let summaryItems = []
  contentBlocks.forEach((block) => {
    if (block.content_blocks_attributes.length > 0) {
      block.content_blocks_attributes.forEach((contentBlockAttribute) => {
        if (contentBlockAttribute.content_type.form_input) {
          summaryItems.push(contentBlockAttribute.summary_item)
        }
      })
    } else{
      if (block.content_type.form_input) {
        summaryItems.push(block.summary_item)
      }
    }
  })

  if (summaryItems.length === 0) {
    return{
      type: "NOTHING_CHANGED",
      payload: null
    }
  }

  const body = {
    call: {
      summary_items_attributes: summaryItems
    }
  }
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

  return {
    type: UPDATE_CALL_STATE,
    payload: promise
  };
}

export function updateCallName(callId, callName) {
  const url = `${BASE_URL}/calls/${callId}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const body = {
    call: {
      name: callName
    }
  }

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(body)
  }).then(r => r.json())


  return {
    type: UPDATE_CALL_NAME,
    payload: callName
  }
}

export function fetchContentTypes() {
  const url = `${BASE_URL}/content_types`;
  // const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_CONTENT_TYPES,
    payload: promise
  }
}


export function uploadAvatar(user, callback) {
  const url = `${BASE_URL}/users/${user.id}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const data = new FormData()
  data.append('user[avatar]', user.avatar)

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: data
  }).then(r => r.json())
    // .then(r => typeof callback === 'function' ? callback(r) : r);

  return{
    type: UPLOAD_AVATAR,
    payload: promise
  }
}


export function updateUser(user, callback) {
  const url = `${BASE_URL}/users/${user.id}`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(user)
  }).then(r => r.json())
    .then(r => typeof callback === 'function' ? callback(r) : r);


  return {
    type: UPDATE_USER,
    payload: user
  }
}
