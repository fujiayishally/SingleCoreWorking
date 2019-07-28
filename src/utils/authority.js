export function getCurrentAuthority() {
  return ['user']
}

export function hasAuthority(needs) {
  const currentAuthority = getCurrentAuthority()
  return currentAuthority.some(auth => needs.includes(auth))
}

export function isLogin() {
  const currentAuthority = getCurrentAuthority()
  return currentAuthority && currentAuthority[0] != 'guest'
}
