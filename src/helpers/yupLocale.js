/* eslint-disable no-template-curly-in-string */

export const mixed = {
  default: 'Este campo es inválido',
  required: 'Este campo es obligatorio',
  oneOf: 'Este campo tiene que ser uno de estos valores: ${values}',
  notOneOf: 'Este campo no puede ser ninguno de estos valores: ${values}',
  defined: 'Este campo debe estar declarado',
};

export const string = {
  length: 'Este campo tiene que tener ${length} caracteres',
  min: 'Este campo tiene que tener al menos ${min} caracteres',
  max: 'Este campo puede tener hasta ${max} caracteres',
  matches: 'Este campo tiene un formato inválido',
  email: 'Este campo tiene que ser un email válido',
  url: 'Este campo tiene que ser una URL válida',
  trim: 'Este campo no puede contener espacios a los costados',
  lowercase: 'Este campo tiene que estar en minúsculas',
  uppercase: 'Este campo tiene que estar en mayúsculas',
};

export const number = {
  min: 'Este campo tiene que ser mayor o igual a ${min}',
  max: 'Este campo tiene que ser menor o igual a ${max}',
  lessThan: 'Este campo tiene que ser menor a ${less}',
  moreThan: 'Este campo tiene que ser mayor a ${more}',
  notEqual: 'Este campo no puede ser igual a ${notEqual}',
  positive: 'Este campo tiene que ser un número positivo',
  negative: 'Este campo tiene que ser un número negativo',
  integer: 'Este campo tiene que ser un número entero',
};

export const date = {
  min: 'Este campo tiene que ser posterior a ${min}',
  max: 'Este campo tiene que ser anterior a ${max}',
  invalid: 'Este campo es una fecha inválida',
};

export const boolean = {};

export const object = {
  noUnknown: 'Este campo no puede contener claves no especificadas en su definición',
};

export const array = {
  min: 'Este campo tiene que tener al menos ${min} elementos',
  max: 'Este campo puede tener hasta ${max} elementos',
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
