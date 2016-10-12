import _ from 'lodash'
import Type from './types'

export default class Field {
  constructor(descriptor) {
    this.descriptor = Object.freeze(_.cloneDeep(descriptor))
    this.Type = new Type()
  }

  name() {
    return this.descriptor.name
  }

  format() {
    return this.descriptor.format || 'default'
  }

  /**
   * Return the `constraints` object of field.
   * @returns {object}
   */
  constraints() {
    return this.descriptor.constraints || {}
  }

  type() {
    return this.descriptor.type || 'string'
  }

  /**
   * Cast value to fieldName's type
   *
   * @param value
   * @param skipConstraints
   *
   * @returns {Type}
   * @throws Error if value can't be casted
   */
  castValue(value, skipConstraints = true) {
    return this.Type.cast(this.descriptor, value, skipConstraints)
  }

  /**
   * Check if value to fieldName's type can be casted
   *
   * @param value
   * @param skipConstraints
   *
   * @returns {Boolean}
   */
  testValue(value, skipConstraints = true) {
    return this.Type.test(this.descriptor, value, skipConstraints)
  }

}

/*

 def cast_value(self, value):
 return self.__type.cast(value)
 */