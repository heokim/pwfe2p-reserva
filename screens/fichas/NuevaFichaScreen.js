import { useNavigation } from '@react-navigation/core';
import { Button, Toast } from 'native-base';
import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import { TextInput, SelectInput } from '../../components/Input';
import { getAll as getClientes } from '../../api/pacientes';
import { getAll as getTiposProducto } from '../../api/tipoProducto';
import { post as postFicha } from '../../api/fichas';
import { TIPO_PERSONA } from '../../constants/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  itemText: { fontSize: 16 },
  itemTitle: {
    fontWeight: 'bold',
  },
});
const NuevaFichaScreen = ({ route }) => {
  const navigation = useNavigation();
  const [ficha, setFicha] = useState(route?.params?.initialFicha || {});

  const updateField = (field, value) =>
    setFicha((prev) => ({ ...prev, [field]: value }));
  useEffect(() => {}, [ficha]);
  const canSave = ficha.diagnostico && ficha.motivoConsulta;
  const save = () => {
    const newFicha = {
      motivoConsulta: ficha.motivoConsulta,
      observacion: ficha.observacion,
      diagnostico: ficha.diagnostico,
      idEmpleado: { idPersona: ficha.empleado.idPersona },
      idCliente: { idPersona: ficha.cliente.idPersona },
      idTipoProducto: { idTipoProducto: ficha.tipoProducto.idTipoProducto },
    };
    console.log(JSON.stringify(newFicha));
    postFicha(newFicha)
      .then(() => {
        Toast.show({ description: 'Ficha creada exitosamente' });
        navigation.goBack();
      })
      .catch((e) => {
        Toast.show({ description: e.toString() });
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: 'white',
        }}
      >
        <SelectInput
          title={'Cliente*'}
          value={ficha.cliente?.nombreCompleto}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (persona) => {
                updateField('cliente', persona);
              },
              fetchOptions: async () => {
                const options = await getClientes();
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
          title={'Fisioterapeuta*'}
          value={ficha.empleado?.nombreCompleto}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (persona) => {
                updateField('empleado', persona);
              },
              fetchOptions: async () => {
                const options = await getClientes({
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
        <TextInput
          title={'Motivo de Consulta*'}
          value={ficha.motivoConsulta || ''}
          setValue={(value) => updateField('motivoConsulta', value)}
        />
        <TextInput
          title={'Diagnostico*'}
          value={ficha.diagnostico || ''}
          setValue={(value) => updateField('diagnostico', value)}
        />
        <SelectInput
          title={'Tipo de Producto*'}
          value={ficha.tipoProducto?.descripcion}
          onPress={() =>
            navigation.navigate('SelectScreen', {
              onSelect: (tipo) => {
                updateField('tipoProducto', tipo);
              },
              fetchOptions: async () => {
                const options = await getTiposProducto();
                return options.map((tipo) => ({
                  id: tipo.idTipoProducto,
                  label: tipo.descripcion,
                  option: tipo,
                }));
              },
            })
          }
        />
        <TextInput
          title={'Observacion'}
          value={ficha.observacion || ''}
          setValue={(value) => updateField('observacion', value)}
        />
      </ScrollView>
      <View style={{ margin: 16 }}>
        <Button
          disabled={!canSave}
          borderRadius={30}
          padding={4}
          onPress={save}
        >
          <Text style={{ fontWeight: 'bold' }}>Guardar</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default NuevaFichaScreen;
