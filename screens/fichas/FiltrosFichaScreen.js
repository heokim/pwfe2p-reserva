import React from 'react';
import { Button, View, Text, ScrollView } from 'native-base';
import { DateInput, SelectInput, TextInput } from '../../components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import { getAll as getPersonas } from '../../api/pacientes';
import { getAll as getCategorias } from '../../api/categoria';
import { getAll as getProductos } from '../../api/tipoProducto';
import { TIPO_PERSONA } from '../../constants/constants';
import { TouchableOpacity } from 'react-native';
const FiltrosFichaScreen = ({
  route: {
    params: { filtros: _filtros, updateFiltro, clearFiltros },
  },
}) => {
  const navigation = useNavigation();
  const [filtros, setFiltros] = useState(_filtros);
  const update = (field, value) => {
    setFiltros((prev) => ({ ...prev, [field]: value }));
    updateFiltro(field, value);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        padding: 16,
      }}
    >
      <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1 }}>
        <SelectInput
          title={'Fisioterapeuta'}
          value={filtros?.empleado?.nombreCompleto}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (persona) => {
                update('empleado', persona);
              },
              fetchOptions: async () => {
                const options = await getPersonas({
                  ejemplo: { soloUsuariosDelSistema: true },
                });

                return options.map((persona) => ({
                  id: persona.idPersona,
                  label: persona.nombreCompleto,
                  subLabel:
                    persona.tipoPersona === TIPO_PERSONA.FISICA
                      ? `CI: ${persona.cedula}`
                      : `RUC: ${persona.ruc}`,
                  option: persona,
                }));
              },
            })
          }
        />
        <SelectInput
          title={'Cliente'}
          value={filtros?.cliente?.nombreCompleto}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (persona) => {
                update('cliente', persona);
              },
              fetchOptions: async () => {
                const options = await getPersonas();

                return options.map((persona) => ({
                  id: persona.idPersona,
                  label: persona.nombreCompleto,
                  subLabel:
                    persona.tipoPersona === TIPO_PERSONA.FISICA
                      ? `CI: ${persona.cedula}`
                      : `RUC: ${persona.ruc}`,
                  option: persona,
                }));
              },
            })
          }
        />
        <DateInput
          title={'Fecha Desde'}
          value={filtros.fechaDesdeCadena}
          setValue={(val) => update('fechaDesdeCadena', val)}
        />
        <DateInput
          title={'Fecha Hasta'}
          value={filtros.fechaHastaCadena}
          setValue={(val) => update('fechaHastaCadena', val)}
        />
        <SelectInput
          title={'Categoria'}
          value={filtros?.categoria?.descripcion}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (categoria) => {
                update('categoria', categoria);
              },
              fetchOptions: async () => {
                const options = await getCategorias();

                return options.map((cat) => ({
                  id: cat.idCategoria,
                  label: cat.descripcion,
                  option: cat,
                }));
              },
            })
          }
        />
        <SelectInput
          title={'Tipo Producto'}
          value={filtros?.tipoProducto?.descripcion}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (val) => {
                update('tipoProducto', val);
              },
              fetchOptions: async () => {
                const options = await getProductos({
                  like: 'S',
                  ejemplo: {
                    idCategoria: {
                      idCategoria: filtros?.categoria?.idCategoria,
                    },
                  },
                });
                return options.map((cat) => ({
                  id: cat.idCategoria,
                  label: cat.descripcion,
                  option: cat,
                }));
              },
            })
          }
        />
      </ScrollView>
      <Button borderRadius={30} padding={4} onPress={() => navigation.goBack()}>
        <Text>Buscar</Text>
      </Button>
      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => {
          clearFiltros();
          setFiltros({});
        }}
      >
        <Text style={{ textAlign: 'center' }}>Borrar Filtros</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FiltrosFichaScreen;
