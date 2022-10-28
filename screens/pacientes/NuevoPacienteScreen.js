import { useNavigation } from '@react-navigation/core';
import { Button, Toast } from 'native-base';
import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { TIPO_PERSONA } from '../../constants/constants';
import { TextInput, DateInput, OptionsInput } from '../../components/Input';
import moment from 'moment';
import { post as postPaciente } from '../../api/pacientes';

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
const NuevoPacienteScreen = () => {
  const navigation = useNavigation();
  const [paciente, setPaciente] = useState({
    fechaNacimiento: moment(),
  });

  const updateField = (field, value) =>
    setPaciente((prev) => ({ ...prev, [field]: value }));

  const canSave =
    paciente.nombre &&
    paciente.apellido &&
    (paciente.cedula || paciente.ruc) &&
    paciente.telefono;
  const save = () => {
    const newPaciente = {
      ...paciente,
      fechaNacimiento: paciente.fechaNacimiento.format('YYYY-MM-DD hh:mm:ss'),
    };
    console.log(newPaciente);
    postPaciente(newPaciente)
      .then(() => {
        Toast.show({ description: 'Paciente creado exitosamente' });
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
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
        <TextInput
          title={'Nombre*'}
          value={paciente.nombre || ''}
          setValue={(value) => updateField('nombre', value)}
        />
        <TextInput
          title={'Apellido*'}
          value={paciente.apellido || ''}
          setValue={(value) => updateField('apellido', value)}
        />
        {/*Tipo de documento*/}
        <OptionsInput
          title="Tipo de Documento"
          options={Object.keys(TIPO_PERSONA)}
          value={paciente.tipoPersona}
          setValue={(value) => updateField('tipoPersona', value)}
        />
        <TextInput
          title={'Numero de Documento*'}
          value={paciente.diagnostico || ''}
          setValue={(value) => {
            if (paciente.tipoPersona === TIPO_PERSONA.FISICA)
              updateField('cedula', value);
            else if (paciente.tipoPersona === TIPO_PERSONA.JURIDICA)
              updateField('ruc', value);
          }}
        />
        <TextInput
          title={'Telefono*'}
          value={paciente.telefono || ''}
          setValue={(value) => updateField('telefono', value)}
        />
        <DateInput
          title="Fecha de Nacimiento"
          value={paciente.fechaNacimiento}
          setValue={(v) => updateField('fechaNacimiento', v)}
          mode="date"
        />
        <TextInput
          title={'Email'}
          value={paciente.email || ''}
          setValue={(value) => updateField('email', value)}
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

export default NuevoPacienteScreen;
