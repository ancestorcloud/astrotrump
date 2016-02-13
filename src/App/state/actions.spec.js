import test from 'ava'
import { buildCreateIndividualQueryParams, convertBirthDate, convertBirthPlace, setGender, formatName } from './actions.utils'

test('converts birth date', t => {
  const initial = '12/05/1988'
  const expected = 'Dec 5 1988'
  const result = convertBirthDate(initial)

  t.is(expected, result)
})

test('converts birth place', t => {
  const initial = 'Simi Valley, CA'
  const expected = 'SimiValley,CA'
  const result = convertBirthPlace(initial)

  t.is(expected, result)
})

test('sets gender in the format One Great Family expects', t => {
  const initial = 'male'
  const expected = 'Male'
  const result = setGender(initial)

  t.is(expected, result)
})

test('sets gender as female when provided a value outside male/female', t => {
  const initial = 'unisex'
  const expected = 'Female'
  const result = setGender(initial)

  t.is(expected, result)
})

test('formats name as One Great Family expects', t => {
  const initial = 'Mikey Murphy'
  const expected = 'Mikey/Murphy'
  const result = formatName(initial)

  t.is(expected, result)
})

test('builds query params as an object with formats that One Great Family is expecting', t => {
  const expected = {
    SessionId: 'sessionid',
    Name: 'Mikey/Murphy',
    Gender: 'Male',
    BirthDate: 'Dec 5 1988',
    BirthPlace: 'SimiValley,CA'
  }

  const result = buildCreateIndividualQueryParams('sessionid', {
    gender: 'male',
    birthday: '12/05/1988',
    location: 'Simi Valley, CA',
    fullName: 'Mikey Murphy'
  })

  t.same(expected, result)
})
