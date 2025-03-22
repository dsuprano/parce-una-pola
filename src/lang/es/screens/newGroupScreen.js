export default {
  title: 'Crear grupo',
  fields: {
    groupName: {
      label: 'Nombre del grupo',
    },
    users: {
      label: 'Agrega amigos al grupo',
    },
  },
  errors: {
    groupName: {
      required: 'Por favor, ingrese el nombre del grupo',
    },
  },
  list: {
    notFound: 'Parece que no hay amigos disponibles',
  },
  label: {
    members: 'Usuarios seleccionados',
  },
  button: {
    create: 'Crear grupo',
  },
};
