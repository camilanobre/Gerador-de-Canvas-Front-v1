import { authHeader } from '../_helpers'

let config = JSON.stringify({
  // apiUrl: 'http://172.21.63.23:4400/api'
  apiUrl: 'http://localhost:4300/api'
  // apiUrl: 'http://localhost:50996/api'
})

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

function login (login, senha) {
  let sistema = 'pessoas'
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha, sistema })
  }
  // return fetch(`http://localhost:4100/api/token`, requestOptions)
  return fetch(`http://187.72.229.145:4100/api/token`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.value) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('usuario', JSON.stringify(user))
      }
      return user
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('usuario')
}

function register (user) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  console.log('USUARIO SERVICE --- OBJETO -> ' + requestOptions)
  return fetch(`${config.apiUrl}/usuario`, requestOptions).then(handleResponse)
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/usuario`, requestOptions).then(handleResponse)
}

function getById (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/usuario/${id}`, requestOptions).then(handleResponse)
}

function update (user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }
  console.log('EXECUTANDO UPDATE NO SERVIÇO DE USUARIO -> ' + user.nome)
  return fetch(`${config.apiUrl}/usuario/${user.id}`, requestOptions).then(handleResponse)
}

function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/usuario/${id}`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        logout()
        location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
