export const fichaFilterToParams = (filter) => ({
  like: 'S',
  ejemplo: {
    idCliente: { idPersona: filter?.cliente?.idPersona },
    idEmpleado: { idPersona: filter?.empleado?.idPersona },
    fechaDesdeCadena: filter?.fechaDesdeCadena?.format('YYYYMMDD'),
    fechaHastaCadena: filter?.fechaHastaCadena?.format('YYYYMMDD'),
    idTipoProducto: { idTipoProducto: filter?.tipoProducto?.idTipoProducto },
  },
});

export const reservaFilterToParams = (filter) => ({
  like: 'S',
  ejemplo: {
    idCliente: { idPersona: filter?.cliente?.idPersona },
    idEmpleado: { idPersona: filter?.empleado?.idPersona },
    fechaDesdeCadena: filter?.fechaDesdeCadena?.format('YYYYMMDD'),
    fechaHastaCadena: filter?.fechaHastaCadena?.format('YYYYMMDD'),
  }
});