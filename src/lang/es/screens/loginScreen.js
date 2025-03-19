export default {
  title: 'Iniciar sesión',
  fields: {
    username: {
      label: 'Email',
      placeholder: '',
    },
    password: {
      label: 'Contraseña',
      placeholder: '',
    },
  },
  errors: {
    username: {
      required: 'Por favor, ingrese su email',
      email: 'El email no es válido',
    },
    password: {
      required: 'Por favor, ingrese su contraseña',
    },
  },
  buttons: {
    login: 'Ingresar',
    signup: 'Crear cuenta',
  },
};
