export function authHeader () {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('usuario'))
  // console.log("USER DENTRO DO AUTH HEADER => " + JSON.stringify(user));
  if (user && user.value.token) {
    return { 'Authorization': 'Bearer ' + user.value.token }
  } else {
    return {}
  }
}
