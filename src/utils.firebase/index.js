import Firebase from 'firebase'

const FB_ROOT = 'https://astrotrump.firebaseio.com/'

export const countFbRef = new Firebase(`${FB_ROOT}count`)
export const userFbRef = new Firebase(`${FB_ROOT}users`)
export const ogfCreds = new Firebase(`${FB_ROOT}ogfCreds`)

export const formatEmailForFirebase = (email) => {
  const key = email.replace('@', '^')
  if (key.indexOf('.') !== -1) {
    return key.split('.').join('*')
  }
  return key
}
