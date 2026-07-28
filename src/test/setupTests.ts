import '@testing-library/jest-dom'
import '../i18n'
import { TextDecoder, TextEncoder } from 'util'

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
})
