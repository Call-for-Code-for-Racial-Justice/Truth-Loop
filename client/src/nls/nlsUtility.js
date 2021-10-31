import msgEn from './messages/en/messages'
import { defineMessages } from 'react-intl'
import { updateIntl } from 'react-intl-redux'
import { store } from '../store/index'

//
// Messages containing unique ID's for react-intl, and default messages.
// Default messages are set to reference english translations file.
// For this reason, english translation file must also always be present, even if not the current locale.
//
// id: string, A unique, stable identifier for the message
// defaultMessage: string, The default message (probably in English)
//
const msgObj = Object.keys(msgEn).reduce((accum, id) => {
  accum[id] = { id, defaultMessage: msgEn[id] }
  return accum
}, {})
export const messages = defineMessages(msgObj)

// Default to English if locale set is unknown
// locale set could come from browser locale, or language selector
export function getLocale(locale) {
  //include fr for testing, in app.js we only ever set 'en' so this is safe
  const LANGUAGES_SUPPORTED = ['en', 'fr']
  //if locale set is unknown, default to english
  if (Object.values(LANGUAGES_SUPPORTED).indexOf(locale) <= -1) {
    return 'en'
  }
  return locale
}

// For Webpack to work correctly with dynamic imports,
// we need to specify constants for imports.
export const getNlsMessages = (locale) => {
  const fixedLocale = getLocale(locale)
  return import('./messages/' + fixedLocale + '/messages')
}

export const getMsgsAndUpdtIntl = (locale) => {
  if (locale) {
    getNlsMessages(locale).then((messages) => {
      store.dispatch(
        updateIntl({
          locale: locale,
          messages: messages.default,
        })
      )
    })
  }
}
