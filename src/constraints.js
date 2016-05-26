import { _ } from 'underscore'
import utilities from './utilities'
const moment = require('moment')

export default {
  /**
   * Required value constraint. Supported types: all.
   * @param name
   * @param value
   * @param required
   * @returns {boolean}
   */
  required(name, value, required) {
    if (required === true) {
      if (_.isUndefined(value) || utilities.NULL_VALUES.indexOf(value) !== -1) {
        throw new Error(`The field "${name}" requires a value`)
      }
    }
    return true
  }

  /**
   * Min length constraint. Supported types: sting, array, object.Args
   * @param name
   * @param value
   * @param minLength
   * @returns {boolean}
   * @throws Error
   */
  , minLength(name, value, minLength) {
    if (value.length < minLength) {
      throw new Error(`The field '${name}' must have a minimum length of ${minLength}`)
    }
    return true
  }

  /**
   * Max length constraint. Supported types: sting, array, object.Args
   * @param name
   * @param value
   * @param maxLength
   * @returns {boolean}
   */
  , maxLength(name, value, maxLength) {
    if (value.length > maxLength) {
      throw new Error(`The field '${name}' must have a maximum length of ${maxLength}`)
    }
    return true
  }

  /**
   * Minimum constraint. Supported types: integer, number, datetime, date, time
   * @param name
   * @param value
   * @param minimum
   * @returns {boolean}
   */
  , minimum(name, value, minimum) {
    let result = false
    if (utilities.isNumeric(value)) {
      result = value < minimum
    } else if (moment.isMoment(value) === true) {
      result = value.isBefore(minimum)
    } else {
      throw new Error('Unsupported type of value')
    }

    if (result) {
      throw new Error(`The field '${name}' must not be less than ${minimum}`)
    }
    return true
  }

  /**
   * Maximum constraint. Supported types: integer, number, datetime, date, time
   * @param name
   * @param value
   * @param maximum
   * @returns {boolean}
   */
  , maximum(name, value, maximum) {
    let result = false
    if (utilities.isNumeric(value)) {
      result = value > maximum
    } else if (moment.isMoment(value) === true) {
      result = value.isAfter(maximum)
    } else {
      throw new Error('Unsupported type of value')
    }

    if (result) {
      throw new Error(`The field '${name}' must not be more than ${maximum}`)
    }
    return true
  }
  /**
   * Pattern constraint for a string value. Supported types: all.
   * Input arguments should NOT be casted to type. Pattern constraint should be
   * checked as a string value before the value is cast. `value` is treated
   * as a string and must match the XML Schema Reg
   * @param name
   * @param value
   * @param pattern
   * @returns {boolean}
   */
  , pattern(name, value, pattern) {
    const v = String(value)
      , match = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'))
      , regex = new RegExp(match[1], match[2])
      , matches = regex.exec(v)
    
    if (matches.length === 0) {
      throw new Error(`The value '${pattern}' must match the pattern`)
    }
    return true
  }

  , unique() {
    throw new Error('Unique constraint is not supported')
  }
}
